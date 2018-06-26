import React from "react";
import "antd/dist/antd.css";
import { cardStyles, feesTbl, unicode } from "./components-pages";
import { CustomIcon } from "../shared-components/common";
import { Form, Card, Row, Col } from "antd";

class PageInfo extends React.Component {
  render() {
    return (
      <Card style={cardStyles}>
        <Row>
          <Col offset={3} span={18}>
            <span style={unicode}>
              <header style={{ color: "red" }}>
                <b>
                  <u>MEMBERSHIP FEES (အသင်းသားအဖြစ် ပေးသွင်းရန်) </u>
                </b>
              </header>
              <br />
              <CustomIcon type="exclamation-circle-o" /> ရာသက်ပန် အသင်းသားအဖြစ်
              ဝင်ကြေး စင်္ကာပူဒေါ်လာ (၅၀) နှင့် ရာသက်ပန်ကြေး ဒေါ်လာ (၃၀၀)၊
              စုစုပေါင်း ဒေါ်လာ (၃၅၀) ပေးသွင်းရမည်ဖြစ်သည်။
              <br />
              <br />
              <CustomIcon type="exclamation-circle-o" /> သာမန်အသင်းသားများအဖြစ်
              Singaporean (သို့) PR (သို့) EP Holderများ ဖြစ်ပါက ဝင်ကြေး
              စင်္ကာပူဒေါ်လာ (၅၀) နှင့် နှစ်စဉ်ကြေး ဒေါ်လာ (၂၄)၊ စုစုပေါင်း
              ဒေါ်လာ (၇၄) ပေးသွင်းရမည်ဖြစ်ပါသည်။
              <br /> <br />
              <CustomIcon type="exclamation-circle-o" /> အခြားသော Pass holder
              များအနေဖြင့် ဝင်ကြေးဒေါ်လာ (၅၀) ပေးသွင်းရန်မလိုပဲ နှစ်စဉ်ကြေး
              ဒေါ်လာ (၂၄) သာပေးသွင်းရန်လိုအပ်ပါသည်။ <br />(အောက်ဖော်ပြပါ
              ဇယားတွင် ကြည့်ရှုနိုင်ပါသည်)
              <br />
              <br />
              <CustomIcon type="exclamation-circle-o" /> Membership Card
              ရိုက်နှိပ်ခအတွက် စင်္ကာပူ ဒေါ်လာ (၅) သီးခြားပေးရမည်ဖြစ်ပါသည်။
              <br />
              <br />
              <CustomIcon type="exclamation-circle-o" /> မြန်မာကလပ်(စင်္ကာပူ)၏
              ဘဏ်အကောင့် (UOB 146-301-836-2) သို့ အသင်းကြေးပေးသွင်းပြီးပါက
              ဘဏ္ဍာရေးမှူး ဒေါ်မြမြစိန် H.P - 8233 5682 သို့ လူကြီးမင်း၏
              အမည်နှင့်တကွ ပေးသွင်းသော အသင်းကြေးငွေ ပမာဏကို message
              ပို့ပေးပါရန်။
              <br />
              <br />
            </span>
          </Col>
          <Col offset={6} span={12}>
            {feesTbl}
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Form.create()(PageInfo);
