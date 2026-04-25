import React, { useState, useEffect } from 'react';
import { Address, FormErrors } from '../types';
import { validateAddress, formatFullAddress } from '../services/addressService';
import './AddressEditDialog.css';

interface AddressEditDialogProps {
  isOpen: boolean;
  address: Address | null;
  onClose: () => void;
  onSave: (address: Address) => void;
}

const AddressEditDialog: React.FC<AddressEditDialogProps> = ({
  isOpen,
  address,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<Partial<Address>>({
    province: '',
    city: '',
    district: '',
    street: '',
    detail: '',
    postalCode: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (address) {
      setFormData({
        province: address.province,
        city: address.city,
        district: address.district,
        street: address.street,
        detail: address.detail,
        postalCode: address.postalCode
      });
      setErrors({});
      setTouched({});
    }
  }, [address]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));

    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    const validation = validateAddress({ ...formData, [name]: formData[name] });
    if (!validation.valid && validation.errors[name]) {
      setErrors(prev => ({ ...prev, [name]: validation.errors[name] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateAddress(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      setTouched({
        province: true,
        city: true,
        district: true,
        detail: true,
        postalCode: true
      });
      return;
    }

    if (address) {
      const updatedAddress: Address = {
        ...address,
        province: formData.province || '',
        city: formData.city || '',
        district: formData.district || '',
        street: formData.street || '',
        detail: formData.detail || '',
        postalCode: formData.postalCode || '',
        fullAddress: formatFullAddress(formData)
      };
      onSave(updatedAddress);
    }
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={handleOverlayClick}>
      <div className="dialog-container">
        <div className="dialog-header">
          <h2 className="dialog-title">编辑地址</h2>
          <button
            type="button"
            className="dialog-close-btn"
            onClick={onClose}
            aria-label="关闭"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form className="dialog-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="province">
                省份 <span className="required">*</span>
              </label>
              <select
                id="province"
                name="province"
                value={formData.province || ''}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`form-select ${
                  touched.province && errors.province ? 'error' : ''
                }`}
              >
                <option value="">请选择省份</option>
                <option value="北京市">北京市</option>
                <option value="上海市">上海市</option>
                <option value="广东省">广东省</option>
                <option value="浙江省">浙江省</option>
                <option value="江苏省">江苏省</option>
                <option value="四川省">四川省</option>
                <option value="湖北省">湖北省</option>
              </select>
              {touched.province && errors.province && (
                <p className="form-error">{errors.province}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="city">
                城市 <span className="required">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city || ''}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="请输入城市"
                className={`form-input ${
                  touched.city && errors.city ? 'error' : ''
                }`}
              />
              {touched.city && errors.city && (
                <p className="form-error">{errors.city}</p>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="district">
                区县 <span className="required">*</span>
              </label>
              <input
                type="text"
                id="district"
                name="district"
                value={formData.district || ''}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="请输入区县"
                className={`form-input ${
                  touched.district && errors.district ? 'error' : ''
                }`}
              />
              {touched.district && errors.district && (
                <p className="form-error">{errors.district}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="street">
                街道
              </label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street || ''}
                onChange={handleInputChange}
                placeholder="请输入街道"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="detail">
              详细地址 <span className="required">*</span>
            </label>
            <input
              type="text"
              id="detail"
              name="detail"
              value={formData.detail || ''}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="请输入详细地址，如门牌号、楼层等"
              className={`form-input ${
                touched.detail && errors.detail ? 'error' : ''
              }`}
            />
            {touched.detail && errors.detail && (
              <p className="form-error">{errors.detail}</p>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="postalCode">
                邮政编码
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode || ''}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="请输入6位邮政编码（可选）"
                className={`form-input ${
                  touched.postalCode && errors.postalCode ? 'error' : ''
                }`}
                maxLength={6}
              />
              {touched.postalCode && errors.postalCode && (
                <p className="form-error">{errors.postalCode}</p>
              )}
            </div>
          </div>

          <div className="dialog-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              取消
            </button>
            <button type="submit" className="btn btn-primary">
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressEditDialog;
