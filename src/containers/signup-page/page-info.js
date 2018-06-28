import React from 'react';
import 'antd/dist/antd.css';
import {
  Form, Card, Row, Col,
} from 'antd';
import { cardStyles, feesTbl, unicode } from './components-pages';
import { CustomIcon } from '../shared-components/common';

const PageInfo = () => (
  <Card style={cardStyles}>
    <Row>
      <Col offset={3} span={18}>
        <header style={{ fontWeight: 'bold', textDecoration: 'underline', color: 'red' }}>
          {'MEMBERSHIP FEES '}
          <span style={unicode}>
            {'(အသင်းသားအဖြစ် ပေးသွင်းရန်)'}
          </span>
        </header>
        <br />

        <CustomIcon type="star" style={{ marginRight: 10 }} />
        <span style={unicode}>
          {'ရာသက်ပန် အသင်းသားအဖြစ် ဝင်ကြေး စင်္ကာပူဒေါ်လာ (၅၀) နှင့် ရာသက်ပန်ကြေး ဒေါ်လာ (၃၀၀)၊ '}
          {'စုစုပေါင်း ဒေါ်လာ (၃၅၀) ပေးသွင်းရမည်ဖြစ်သည်။'}
        </span>
        <br />
        <br />

        <CustomIcon type="star" style={{ marginRight: 10 }} />
        <span style={unicode}>
          {'သာမန်အသင်းသားများအဖြစ် Singaporean (သို့) PR (သို့) EP Holder များဖြစ်ပါက '}
          {
            'ဝင်ကြေး စင်္ကာပူဒေါ်လာ (၅၀) နှင့် နှစ်စဉ်ကြေး ဒေါ်လာ (၂၄)၊ စုစုပေါင်း ဒေါ်လာ (၇၄) ပေးသွင်းရမည်ဖြစ်ပါသည်။'
          }
        </span>
        <br />
        <br />

        <CustomIcon type="star" style={{ marginRight: 10 }} />
        <span style={unicode}>
          {' အခြားသော Pass holder များအနေဖြင့် ဝင်ကြေးဒေါ်လာ (၅၀) ပေးသွင်းရန်မလိုပဲ '}
          {'နှစ်စဉ်ကြေး ဒေါ်လာ (၂၄) သာပေးသွင်းရန်လိုအပ်ပါသည်။'}
          <br />
          {'(အောက်ဖော်ပြပါ ဇယားတွင် ကြည့်ရှုနိုင်ပါသည်)'}
        </span>
        <br />
        <br />

        <CustomIcon type="star" style={{ marginRight: 10 }} />
        <span style={unicode}>
          {'Membership Card ရိုက်နှိပ်ခအတွက် စင်္ကာပူ ဒေါ်လာ (၅) သီးခြားပေးရမည်ဖြစ်ပါသည်။'}
        </span>
        <br />
        <br />

        <CustomIcon type="star" style={{ marginRight: 10 }} />
        <span style={unicode}>
          {' မြန်မာကလပ်(စင်္ကာပူ)၏ ဘဏ်အကောင့် '}
        </span>
        {'(UOB 146-301-836-2) '}
        <span style={unicode}>
          {'သို့ အသင်းကြေးပေးသွင်းပြီးပါက ဘဏ္ဍာရေးမှူး ဒေါ်မြမြစိန် '}
        </span>
        {'H.P - 8233 5682 '}
        <span style={unicode}>
          {'သို့ လူကြီးမင်း၏ အမည်နှင့်တကွ ပေးသွင်းသော အသင်းကြေးငွေ ပမာဏကို message ပို့ပေးပါရန်။'}
        </span>
        <br />
        <br />
      </Col>
      <Col offset={6} span={12}>
        {feesTbl}
      </Col>
    </Row>
  </Card>
);

export default Form.create()(PageInfo);
