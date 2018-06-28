import { Icon, Button } from 'antd';
import styled from 'styled-components';

export const dateFormat = 'DD-MM-YYYY';
export const monthFormat = 'MM-YYYY';

export const FormInputIcon = styled(Icon)`
  color: rgba(0, 0, 0, 0.25);
`;
export const CustomIcon = styled(Icon)`
  color: rgba(0, 0, 0, 0.25);
`;

export const FullWidthButton = styled(Button)`
  width: 100%;
`;

export const pageStyles = {
  width: 1300,
  minWidth: 1300,
  padding: '20px 5px 5px',
  borderRadius: 10,
  top: '5%',
  marginLeft: 'auto',
  marginRight: 'auto',
};

export const extraInfoStyles = {
  color: 'rgba(0, 0, 0, 0.4)',
  fontStyle: 'italic',
  marginLeft: 8,
};

export const radioStyle = {
  paddingTop: 6,
  display: 'block',
  lineHeight: 2,
};
