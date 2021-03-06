import React from 'react';
import { Form, Input, Col } from 'antd';
import { MarginLeftButton, FullButton } from './shared-styled';

const FormItem = Form.Item;

// Responsive layout for event forms
export const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 8 },
    xl: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 16 },
    xl: { span: 16 },
  },
};

/* eslint react/prop-types: 0 */
// SearchNamePanel
export const SearchNamePanel = ({
  onChange,
  decorator,
  onSearch,
  onClickReset,
  placeHolder,
}) => (
  <FormItem style={{ marginBottom: 3 }}>
    <Col span={4}>
      {decorator('searchName', { initialValue: null })(
        <Input
          placeholder={placeHolder}
          onChange={onChange}
          onPressEnter={onSearch}
        />,
      )}
    </Col>
    <Col span={20}>
      <MarginLeftButton type="primary" onClick={onSearch}>
        Search
      </MarginLeftButton>
      <MarginLeftButton type="primary" onClick={onClickReset} ghost>
        Clear Search
      </MarginLeftButton>
    </Col>
  </FormItem>
);

// BackButton
export const BackButton = ({ history }) => (
  <FullButton onClick={() => history.go(-1)}>Go Back</FullButton>
);

// // Event form data
// const initialValue = { initialValue: '' };
// const customInput = { style: { width: '200px' } };

// // Event Name
// export const EventNameInput = ({ decorator }) => (
//   <FormItem {...layout} label="Event Name">
//     {decorator('name', {
//       rules: [
//         {
//           required: true,
//           message: 'Please input event name!',
//         },
//       ],
//     })(<Input {...customInput} placeholder="Event Name" />)}
//   </FormItem>
// );

// // Event Description
// export const EventDescriptionInput = ({ decorator }) => (
//   <FormItem {...layout} label="Description">
//     {decorator('description', {
//       rules: [
//         {
//           required: true,
//           message: 'Please input event description!',
//         },
//       ],
//     })(<TextArea {...customInput} rows={2} placeholder="Event Description" />)}
//   </FormItem>
// );

// // Event Start Date/Time
// export const StartDateTimePicker = ({ decorator }) => (
//   <FormItem {...layout} label="Start Date/Time" colon required>
//     <Row type="flex" justify="start">
//       <Col {...inputLayout1}>
//         <FormItem>
//           {decorator('startDate', {
//             rules: [
//               {
//                 required: true,
//                 message: 'Please enter event start date!',
//               },
//             ],
//           })(<DatePicker {...customInput} format={DATE_FORMAT} />)}
//         </FormItem>
//       </Col>
//       <Col {...inputLayout2}>
//         <FormItem>
//           {decorator('startTime', {
//             rules: [
//               {
//                 required: true,
//                 message: 'Please enter event start time!',
//               },
//             ],
//           })(<TimePicker {...customInput} format={TIME_FORMAT} />)}
//         </FormItem>
//       </Col>
//     </Row>
//   </FormItem>
// );

// // Event End Date/Time
// export const EndDateTimePicker = ({ decorator }) => (
//   <FormItem {...layout} label="End Date/Time">
//     <Row gutter={8} type="flex" justify="start">
//       <Col {...inputLayout1}>
//         <FormItem>
//           {decorator('endDate')(
//             <DatePicker {...customInput} format={DATE_FORMAT} />,
//           )}
//         </FormItem>
//       </Col>

//       <Col {...inputLayout2}>
//         <FormItem>
//           {decorator('endTime')(
//             <TimePicker {...customInput} format={TIME_FORMAT} />,
//           )}
//         </FormItem>
//       </Col>
//     </Row>
//   </FormItem>
// );

// // Location Address
// export const AddressInput = ({ decorator }) => (
//   <FormItem {...layout} label="Location" colon required>
//     <Row gutter={8} type="flex" justify="start">
//       <Col {...inputLayout1}>
//         <FormItem>
//           {decorator('locationLine1', {
//             rules: [
//               {
//                 required: true,
//                 message: 'Please input event address!',
//               },
//             ],
//           })(<Input {...customInput} placeholder="Street Address Line 1..." />)}
//         </FormItem>
//       </Col>
//       <Col {...inputLayout2}>
//         <FormItem>
//           {decorator('locationLine2', initialValue)(
//             <Input {...customInput} placeholder="Street Address Line 2..." />,
//           )}
//         </FormItem>
//       </Col>
//     </Row>
//   </FormItem>
// );

// // Postal Code
// export const PostalCodeInput = ({ decorator }) => (
//   <FormItem {...layout} label=" " colon={false} required={false}>
//     {decorator('locationPostalCode', {
//       rules: [
//         {
//           pattern: '^([0-9]{6})$',
//           message: 'The input is not a valid postal/zip code!',
//         },
//         {
//           required: true,
//           message: 'Please enter postal/zip code!',
//         },
//       ],
//     })(<Input {...customInput} maxLength="6" placeholder="Postal/Zip Code" />)}
//   </FormItem>
// );

// // Refreshment
// export const RefreshmentRadio = ({ decorator }) => (
//   <FormItem
//     {...layout}
//     label="Refreshment Provided"
//     style={{ marginBottom: 0 }}
//   >
//     {decorator('isRefreshmentProvided', initialValue)(
//       <RadioGroup name="refreshment">
//         <RadioButton value="1">Yes</RadioButton>
//         <RadioButton value="0">No</RadioButton>
//       </RadioGroup>,
//     )}
//   </FormItem>
// );

// const validateNumber = (rule, value, callback) => {
//   if (value && Number.isNaN(Number(value))) {
//     callback('Please enter a number!');
//   } else {
//     callback();
//   }
// };

// // Ticket fee
// export const TicketFeeInput = ({ decorator }) => (
//   <FormItem {...layout} label="Ticket Fee (SGD)">
//     {decorator('ticketFee', {
//       initialValue: '',
//       rules: [
//         {
//           validator: validateNumber,
//         },
//       ],
//     })(<Input {...customInput} />)}
//   </FormItem>
// );

// // No of Pax
// export const NumPaxInput = ({ decorator }) => (
//   <FormItem {...layout} label="No of Pax">
//     {decorator('noOfPax', {
//       initialValue: '',
//       rules: [
//         {
//           validator: validateNumber,
//         },
//       ],
//     })(<Input {...customInput} />)}
//   </FormItem>
// );

// // Email address
// export const EmailAddressInput = ({ decorator }) => (
//   <FormItem {...layout} label="Email Address">
//     {decorator('emailAddress', {
//       initialValue: '',
//       rules: [
//         {
//           type: 'email',
//           message: 'The input is not valid E-mail!',
//         },
//       ],
//     })(<Input {...customInput} placeholder="Email Address" />)}
//   </FormItem>
// );

// // Contact Person
// export const ContactPersonInput = ({ decorator }) => (
//   <FormItem {...layout} label="Contact Person">
//     {decorator('contactPerson', initialValue)(
//       <Input {...customInput} placeholder="Contact Person Name" />,
//     )}
//   </FormItem>
// );

// // Mobiel Number
// export const MobileNoInput = ({ decorator }) => {
//   const areaCodeDdl = decorator('areaCode', {
//     initialValue: '65',
//   })(
//     <Select>
//       <Option value="65">+65</Option>
//       <Option value="95">+95</Option>
//     </Select>,
//   );
//   return (
//     <FormItem {...layout} label="Mobile No" style={{ marginBottom: 0 }}>
//       {decorator('mobilePhone', {
//         initialValue: '',
//         rules: [
//           {
//             pattern: '^([0-9]{6,})$',
//             message: 'The input is not a valid phone number!',
//           },
//         ],
//       })(
//         <Input
//           {...customInput}
//           addonBefore={areaCodeDdl}
//           placeholder="Mobile Phone"
//         />,
//       )}
//     </FormItem>
//   );
// };

// export class EventPhoto extends Component {
//   state = {
//     isModalVisible: false,
//   };

//   onCloseModal = () => {
//     this.setState({
//       isModalVisible: false,
//       photoLink: '',
//     });
//   };

//   showModal = (file) => {
//     this.setState({
//       isModalVisible: true,
//       photoLink: file.url || file.thumbUrl,
//     });
//   };

//   render() {
//     const { decorator, beforeUpload, removeFile } = this.props;
//     const { isModalVisible, photoLink } = this.state;
//     this.newFile = [];
//     return (
//       // must use inline style due to layout
//       <FormItem {...layout} label="Event Photo" style={{ marginBottom: 0 }}>
//         {decorator('uploadBtn', {
//           valuePropName: 'fileList',
//           initialValue: [],
//           getValueFromEvent: (e) => {
//             const { fileList } = e;
//             this.newFile = fileList.length > 1 ? fileList.slice(1) : fileList;
//             return this.newFile;
//           },
//         })(
//           <Upload
//             name="eventpic"
//             listType="picture-card"
//             onPreview={this.showModal}
//             onRemove={file => removeFile(file)}
//             beforeUpload={file => beforeUpload(file)}
//             // Hook function which will be executed before uploading.
//             // Uploading will be stopped with false or a rejected Promise returned.
//             // Warning：this function is not supported in IE9。
//             action="//jsonplaceholder.typicode.com/posts/"
//           >
//             {this.newFile.length >= 2 ? null : (
//               <div>
//                 <Icon type="plus" />
//                 <div>Upload New Photo</div>
//               </div>
//             )}
//           </Upload>,
//         )}
//         <Modal
//           visible={isModalVisible}
//           onCancel={this.onCloseModal}
//           footer={null}
//         >
//           <img alt="example" width="100%" src={photoLink} />
//         </Modal>
//       </FormItem>
//     );
//   }
// }

// // CreateButton
// export const CreateButton = () => (
//   <FullButton type="primary" htmlType="submit">
//     Create Event
//   </FullButton>
// );

// end Event form data
