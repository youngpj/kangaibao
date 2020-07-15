<template>
  <div class="page">
    <!-- 投保人信息 -->
    <div class="info-container">
      <div class="info-title">投保人信息</div>
      <div class="info-item-content">
        <div class="info-item">
          <div class="key">姓名</div>
          <div class="val" input-tag="投保人-姓名">{{ policyInfo && policyInfo.holderCustomer.customerName }}</div>
        </div>
        <div class="info-item">
          <div class="key">性别</div>
          <div class="val" input-tag="投保人-性别">{{ policyInfo && policyInfo.holderCustomer.idNumber.substr(16, 1) % 2 ==
            1 ? '男' : '女' }}</div>
        </div>
        <!-- <div class="info-item">
          <div class="key">地址</div>
          <div class="val" input-tag="投保人-地址">{{ policyInfo && policyInfo.holderCustomer.dynamicFields.ADDRESS }}</div>
        </div> -->
        <div class="info-item">
          <div class="key">证件类型</div>
          <div class="val" input-tag="投保人-证件类型">身份证</div>
        </div>
        <div class="info-item">
          <div class="key">证件编号</div>
          <div class="val" input-tag="投保人-证件编号">{{ policyInfo && policyInfo.holderCustomer.idNumber }}</div>
        </div>
         <div class="info-item" v-if="policyInfo.holderCustomer.parameters.IDVALIDTIME">
          <div class="key">证件有效期</div>
          <div class="val">{{ policyInfo && policyInfo.holderCustomer.parameters.IDVALIDTIME=='1'?'长期':policyInfo.holderCustomer.parameters.IDVALIDTIME}}</div> 
        </div>
        <div class="info-item">
          <div class="key">职业类别</div>
          <div class="val">{{ policyInfo && policyInfo.holderCustomer.parameters.JOB }}</div>
        </div>
        <div class="info-item">
          <div class="key">手机号码</div>
          <div class="val" input-tag="投保人-手机号码">{{ policyInfo && policyInfo.holderCustomer.mobile }}</div>
        </div>
      </div>
    </div>

    <!-- 被保人信息 -->
    <div class="info-container">
      <div class="info-title">被保险人信息</div>
      <div class="info-item-content">
        <div class="info-item">
          <div class="key">与投保人关系</div>
          <div class="val" input-tag="被保险人-与投保人关系">{{ policyInfo &&
            relationOpt[policyInfo.beInsuredCustomers[0].relationWithHolder] }}</div>
        </div>
        <div class="info-item">
          <div class="key">性别</div>
          <div class="val" input-tag="被保险人-性别">{{ policyInfo && policyInfo.beInsuredCustomers[0].idNumber.substr(16, 1)
            % 2 == 1 ? '男' : '女' }}</div>
        </div>
        <div class="info-item">
          <div class="key">姓名</div>
          <div class="val" input-tag="被保险人-姓名">{{ policyInfo && policyInfo.beInsuredCustomers[0].customerName }}</div>
        </div>
        <div class="info-item">
          <div class="key">证件类型</div>
          <div class="val" input-tag="被保险人-证件类型">身份证</div>
        </div>
        <div class="info-item">
          <div class="key">证件编号</div>
          <div class="val" input-tag="被保险人-证件编号">{{ policyInfo && policyInfo.beInsuredCustomers[0].idNumber }}</div>
        </div>
         <div class="info-item" v-if="policyInfo.beInsuredCustomers[0].parameters.IDVALIDTIME">
          <div class="key">证件有效期</div>
          <div class="val">{{ policyInfo && policyInfo.beInsuredCustomers[0].parameters.IDVALIDTIME=='1'?'长期':policyInfo.beInsuredCustomers[0].parameters.IDVALIDTIME }}</div> 
        </div>
        <div class="info-item">
          <div class="key">职业类别</div>
          <div class="val">{{ policyInfo && policyInfo.beInsuredCustomers[0].parameters.JOB }}</div>
        </div>
        <div class="info-item">
          <div class="key">出生日期</div>
          <div class="val" input-tag="被保险人-出生日期">{{ storeInfo && storeInfo.birthday}}</div>
        </div> 
          <div class="info-item" v-if="policyInfo.beInsuredCustomers[0].parameters.IDVALIDTIME">
          <div class="key">地址</div>
          <div class="val">{{ policyInfo && policyInfo.beInsuredCustomers[0].address }}</div> 
        </div>
      </div>
    </div>

    <!-- 投保信息 -->
    <div class="info-container">
      <div class="info-title">保险信息</div>
      <div class="info-item-content">
        <div class="info-item">
          <div class="key">保障期限</div>
          <div class="val" input-tag="保险信息-保障期限">{{policyInfo && policyInfo.effectiveDate}} 至{{policyInfo &&
            policyInfo.expiredDate}} </div>
        </div>
        <div class="info-item">
          <div class="key">受益人</div>
          <div class="val" input-tag="保险信息-受益人">{{ policyInfo && policyInfo.beInsuredCustomers[0].customerName }}</div>
        </div>
        <div class="info-item">
          <div class="key">有无社保</div>
          <div class="val" input-tag="保险信息-有无社保">{{ policyInfo &&
            this.policyInfo.beInsuredCustomers[0].parameters.SOCIALSECURITY == '1' ? '有' : '无'}}</div>
        </div>
      </div>
    </div>

    <!-- 保障额度 -->
    <div class="info-container">
      <div class="info-title">保障额度</div>
      <div class="info-item-content" v-if="policyInfo">
        <div class="info-item" v-show="policyInfo.insureparameters.MPN!=0">
          <div class="key">一般医疗保险金</div>
          <div class="val" :input-tag="'保险信息-一般医疗保险金'">{{mpnValue[policyInfo.insureparameters.MPN]}}</div>
        </div>
        <div class="info-item" v-if="policyInfo.insureparameters.OPN!=0">
          <div class="key">普通门急诊医疗保险金</div>
          <div class="val" :input-tag="'保险信息-普通门急诊医疗保险金'">{{opnValue[policyInfo.insureparameters.OPN]}}</div>
        </div>
      </div>
    </div>

    <div class="pay-container">
      <div class="pay-key">实付保费：</div>
      <div class="pay-val" input-tag="实付保费"><span style="font-size: 0.39436619718309857rem;">￥</span>{{policyInfo &&
        app || 0}}</div>
    </div>
    <div class="footer-btn" @click="confirmOrder" click-tag="确认支付">确认支付 ¥ {{policyInfo && app|| 0}}</div>

  </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>