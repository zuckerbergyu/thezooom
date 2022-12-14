const deliveryTracking = (dlvCompnyCd: string, dlvNo: string) => {
  if (dlvCompnyCd === '1001') {
    // 우체국택배
    window.open(
      'https://service.epost.go.kr/trace.RetrieveDomRigiTraceList.comm?displayHeader=N&sid1=' +
        dlvNo,
      'From',
      'width=900, height=700, resizable=no, scrollbars=yes'
    );
  } else if (dlvCompnyCd === '1002') {
    // CJ 대한통운
    window.open(
      'https://www.doortodoor.co.kr/parcel/doortodoor.do?fsp_action=PARC_ACT_002&fsp_cmd=retrieveInvNoACT&invc_no=' +
        dlvNo,
      'From',
      'width=900, height=700, resizable=no, scrollbars=yes'
    );
  } else if (dlvCompnyCd === '1003') {
    // 한진택배
    window.open(
      'https://www.hanjin.co.kr/kor/CMS/DeliveryMgr/WaybillResult.do?mCode=MN038&schLang=KR&wblnumText2=' +
        dlvNo,
      'From',
      'width=900, height=700, resizable=no, scrollbars=yes'
    );
  } else if (dlvCompnyCd === '1004') {
    // 로젠택배
    window.open(
      'https://www.ilogen.com/web/personal/trace/' + dlvNo,
      'From',
      'width=900, height=700, resizable=no, scrollbars=yes'
    );
  } else if (dlvCompnyCd === '1008') {
    // 천일택배
    window.open(
      'https://www.chunil.co.kr/HTrace/HTrace.jsp?transNo=' + dlvNo,
      'From',
      'width=900, height=700, resizable=no, scrollbars=yes'
    );
  } else if (dlvCompnyCd === '1011') {
    // 롯데택배
    window.open(
      'https://www.lotteglogis.com/home/reservation/tracking/linkView?InvNo=' +
        dlvNo,
      'From',
      'width=900, height=700, resizable=no, scrollbars=yes'
    );
  } else if (dlvCompnyCd === '1012') {
    // 경동택배
    window.open(
      'https://kdexp.com/basicNewDelivery.kd?barcode=' + dlvNo,
      'From',
      'width=900, height=700, resizable=no, scrollbars=yes'
    );
  } else if (dlvCompnyCd === '1014') {
    // 일양로지스
    window.open(
      'https://www.ilyanglogis.com/functionality/tracking_result.asp?hawb_no=' +
        dlvNo,
      'From',
      'width=900, height=700, resizable=no, scrollbars=yes'
    );
  } else if (dlvCompnyCd === '1015') {
    // 홈픽
    window.open(
      'https://www.homepick.com/tracking/' + dlvNo,
      'From',
      'width=900, height=700, resizable=no, scrollbars=yes'
    );
  }
};

export default deliveryTracking;
