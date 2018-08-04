import React from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import {
  PageCard, MMText, BulletIcon, HightlightedText, FlexContainer,
} from './styled-components';
import FeesTable from './fees-table';

const infoTexts = [
  'ရာသက်ပန် အသင်းသားအဖြစ် ဝင်ကြေး စင်္ကာပူဒေါ်လာ (၅၀) နှင့် ရာသက်ပန်ကြေး ဒေါ်လာ (၃၀၀)၊ စုစုပေါင်း ဒေါ်လာ (၃၅၀) ပေးသွင်းရမည်ဖြစ်သည်။',
  'သာမန်အသင်းသားများအဖြစ် Singaporean (သို့) PR (သို့) EP Holder များဖြစ်ပါက ဝင်ကြေး စင်္ကာပူဒေါ်လာ (၅၀) နှင့် နှစ်စဉ်ကြေး ဒေါ်လာ (၂၄)၊ စုစုပေါင်း ဒေါ်လာ (၇၄) ပေးသွင်းရမည်ဖြစ်ပါသည်။',
  'အခြားသော Pass holder များအနေဖြင့် ဝင်ကြေးဒေါ်လာ (၅၀) ပေးသွင်းရန်မလိုပဲ နှစ်စဉ်ကြေး ဒေါ်လာ (၂၄) သာပေးသွင်းရန်လိုအပ်ပါသည်။ ',
  'Membership Card ရိုက်နှိပ်ခအတွက် စင်္ကာပူ ဒေါ်လာ (၅) သီးခြားပေးရမည်ဖြစ်ပါသည်။',
  'မြန်မာကလပ်(စင်္ကာပူ)၏ ဘဏ်အကောင့် (UOB 146-301-836-2) သို့ အသင်းကြေးပေးသွင်းပြီးပါက ဘဏ္ဍာရေးမှူး ဒေါ်မြမြစိန် H.P - 8233 5682 သို့ လူကြီးမင်း၏ အမည်နှင့်တကွ ပေးသွင်းသော အသင်းကြေးငွေ ပမာဏကို message ပို့ပေးပါရန်။',
];

const MMBulletText = ({ text }) => (
  <FlexContainer>
    <BulletIcon type="star" />
    <MMText> {text} </MMText>
  </FlexContainer>
);

MMBulletText.propTypes = {
  text: PropTypes.string.isRequired,
};

const PageInfo = () => (
  <PageCard>
    <Row>
      <Col offset={3} span={18}>
        <HightlightedText>
          MEMBERSHIP FEES
          <MMText>(အသင်းသားအဖြစ် ပေးသွင်းရန်)</MMText>
        </HightlightedText>
        <br />
        {/* only use index as key if array is fixed and list won't be rerendered */}
        {infoTexts.map((text, i) => <MMBulletText key={i.toString()} text={text} />)}
      </Col>

      <Col offset={6} span={12}>
        <FeesTable />
      </Col>
    </Row>
  </PageCard>
);

export default PageInfo;
