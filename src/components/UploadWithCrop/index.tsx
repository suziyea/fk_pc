import {
  notification,
  Upload,
  Modal,
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import Cropper from 'react-cropper';
import { UploadFile, UploadListType } from 'antd/lib/upload/interface';
// import ImageCompressor from 'js-image-compressor';
import ImageCompressor from 'compressorjs';
import styles from './index.less';

import 'cropperjs/dist/cropper.css';
import { imgUpload } from '@/services/api/user';

interface UploadPropsType {
  /**
   * @description 裁切宽度
   */
  width: number;
  /**
   * @description 裁切高度, 不传则自适应
   */
  height?: number;
  /**
   * @description 支持上传的图片类型 默认 jpg,png
   */
  imgType?: Array<string>;
  /**
   * @description 受控value
   */
  value?: any;
  /**
   * @description change事件
   */
  onChange?: (val: any) => void;
  /**
   * @description 上传多张
   */
  multiple?: boolean;
  /**
   * @description 最大张数
   */
  max?: number;
}

/**
 * 照片上传 + 裁切
 * */
const UploadWithCrop = ({
  width, height, imgType = ['jpg', 'png'], value, onChange, multiple, max,
}: UploadPropsType) => {
  /**
   * 上传图片loading
   *  */
  const [uploading, setUpLoading] = useState<boolean>(false);
  /**
   * 上传图片的url（预览用）
   *  */
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imgSrc, setImgSrc] = useState<any>(null);
  const [isCropVisible, setIsCropVisible] = useState<boolean>(false);
  const [cropper, setCropper] = useState<any>(undefined);
  const [previewVisible, setPreviewVisible] = useState<any>(false);

  const [autoHeight, setAutoHeight] = useState<number>(0);
  const [fileName, setFileName] = useState<string>('');
  /**
   * 上传加载
   *  */
  const uploadButton = (
    <div>
      {uploading && <LoadingOutlined />}
      {/* 如果是单张上传则始终展示上传按钮 */}
      {!uploading && (!multiple && (value || imageUrl) ? <img src={ imageUrl || (typeof value === 'string' && value) || value.url} alt="banner" style={{ width: '100%', cursor: 'pointer' }} />
        : (
          <div style={{ overflow: 'hidden' }}>
            <PlusOutlined />
            <p>上传照片</p>
          </div>
        )
      )}
    </div>
  );

  const handlePreview = async (file: any) => {
    setImageUrl(file.url);
    setPreviewVisible(true);
  };

  const handleRemove = (file: UploadFile) => {
    if (typeof value === 'object') {
      triggerChange(value?.filter((v: UploadFile) => v.uid !== file.uid));
    }
  };

  const compressPngToJpg = (file: File) => new Promise<File>((resolve) => {
    const fileType = file.type.replace('image/', '');
    if (fileType !== 'gif') {
      const options = {
        quality: 0.9,
        mimeType: 'image/jpeg',
        // 压缩成功回调
        success(result: any) {
          resolve(new File([result], result.name || fileName || 'image.jpg', { type: result.type }));
        },
      };
      // eslint-disable-next-line no-new
      new ImageCompressor(file, options);
    } else {
      resolve(file);
    }
  });

  const uploadOperation = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('filename_length', file, '文件名');
    const res = await imgUpload(formData);
    notification.success({
      message: '上传成功',
    });
    return res;
  };

  const uploadProps = {
    action: `${API_SERVER}/api/media/image/upload`,
    listType: 'picture-card' as UploadListType,
    showUploadList: !!multiple,
    fileList: multiple ? value : false,
    onPreview: multiple ? handlePreview : false,
    onRemove: multiple ? handleRemove : false,
    beforeUpload: (file: any) => {
      // 如果支持jpg 需要添加jpeg后缀的判断
      const formatArr = [...imgType];
      if (imgType.indexOf('jpg') > -1) {
        formatArr.push('jpeg');
      }
      const hasSupportExt = formatArr.indexOf((`${file.type.replace('image/', '')}`)) > -1;
      if (!hasSupportExt) {
        notification.error({
          message: '上传失败',
          description: '上传的图片格式不支持',
        });
        return Upload.LIST_IGNORE;
      }
      return hasSupportExt && (new Promise(() => {
        const fileType = file.type.replace('image/', '');
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const image = new Image();
          image.src = reader.result as string;
          image.onload = async () => {
            // 上传前将png 转为jpg压缩
            const compressFile:File = await compressPngToJpg(file);
            setFileName(compressFile.name);
            //  判断有哪些不要裁切的 直接上传
            // 1. 没传高度，直接使用原尺寸
            // 2. gif不裁切
            if (!height || (fileType === 'gif')) {
              const res = await uploadOperation(compressFile);
              setImageUrl(res?.file);
              if (multiple) {
                triggerChange([...(value || []), {
                  uid: res?.file,
                  url: res?.file,
                  width: image.width,
                  height: image.height,
                }]);
              } else if (!height) {
                triggerChange({
                  url: res?.file,
                  width: image.width,
                  height: image.height,
                });
              } else {
                triggerChange(res?.file);
              }
            } else {
              setIsCropVisible(true);
              setImgSrc(reader.result!);
            }
          };
        };
      }));
    },
  };

  const triggerChange = (filePath: any) => {
    onChange?.(filePath);
  };

  return (
    <>
      <Modal
        width={800}
        title="裁切图片"
        visible={isCropVisible}
        onOk={async () => {
          if (typeof cropper !== 'undefined') {
            cropper.getCroppedCanvas({
              width: width * 3,
              height: (height || autoHeight) * 3,
              imageSmoothingQuality: 'high',
              fillColor: '#fff',
            }).toBlob(async (blob: any) => {
              // 上传前将png 转为jpg压缩
              const compressFile:File = await compressPngToJpg(blob);
              const res = await uploadOperation(compressFile);
              setIsCropVisible(false);
              setImageUrl(res?.path);
              if (multiple) {
                triggerChange([...(value || []), {
                  uid: res?.file,
                  url: res?.file,
                  width: width * 3,
                  height: (height || autoHeight) * 3,
                }]);
              } else {
                triggerChange(res?.file);
              }
            });
          }
        }}
        onCancel={() => setIsCropVisible(false)}>
        <Cropper
          viewMode={1}
          style={{ maxHeight: 400, width: '100%' }}
          preview=".img-preview"
          src={imgSrc}
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          autoCropArea={1}
          background={false}
          guides
          aspectRatio={width / (height || autoHeight)} />
        <p>阴影区域双击可拖动背景图</p>
      </Modal>
      <Upload
        className={styles.upload}
        {...uploadProps}>
        {
          multiple && (value?.length || 0) >= (max || 0) ? null : uploadButton
        }
      </Upload>
      <p>
        支持
        {imgType.map((v) => `.${v}`).join('、')}
        &nbsp;格式
      </p>
      <p>
        建议尺寸
        {width * 3}
        {
          height && `x${height * 3}`
        }
        px
      </p>
      {value} ----
      <Modal
        visible={previewVisible}
        title="图片预览"
        footer={null}
        onCancel={() => setPreviewVisible(false)}>
        <img alt="example" style={{ width: '100%' }} src={imageUrl} />
      </Modal>
    </>
  );
};

export default UploadWithCrop;
