function dailyReminderAt8AM() {
  var googleCalendarId = "kruyinphakhai.nfe@gmail.com";
  var calendar = CalendarApp.getCalendarById(googleCalendarId);
  
  var today = new Date();
  
  // ดึงกิจกรรมของวันนี้
  var todayEventList = calendar.getEventsForDay(today);
  
  // ชุดฟังก์ชันแปลงวันที่
  var strWeek = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];
  var strMonthFull = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
  
  var curdate = today.getDate();
  var daycur = today.getDay();
  var monthcur = today.getMonth();
  var yearcur = today.getFullYear() + 543;
  
  var MonthId = strMonthFull[monthcur];
  var Day_List = strWeek[daycur];
  var DayShow = `${Day_List} ที่ ${curdate} ${MonthId} พ.ศ. ${yearcur}`;
  
  // ตรวจสอบว่ามีกิจกรรมหรือไม่
  if (todayEventList.length > 0) {
    var messageAll = DayShow;
    
    // วนลูปสร้างข้อความสำหรับแต่ละกิจกรรม
    for (var i = 0; i < todayEventList.length; i++) {
      var event = todayEventList[i];
      var eventTitle = `📚 เรื่อง : ${event.getTitle()}`;
      var eventTime = `⌚ เวลา : ${Utilities.formatDate(event.getStartTime(), "Asia/Bangkok", "HH:mm")}`;
      
      var eventDescription = `🎯 รายละเอียด :\n${event.getDescription() || 'ไม่มีรายละเอียดเพิ่มเติม'}`;
      var eventLink = "ดูรายละเอียดเพิ่มเติมได้ที่ : https://calendar.google.com/calendar/embed?src=kruyinphakhai.nfe%40gmail.com&ctz=Asia%2FBangkok";
      
      messageAll += `\n${eventTitle}\n${eventTime}\n${eventDescription}\n${eventLink}`;
    }
    
    // ส่งข้อความ
    sendMessage(messageAll);
  }
}

function sendMessage(message) {
  var telegramApiToken = '8111309433:AAFW7kG-Xh-hpA-nSQG_aMCcOC5O617BScM';
  var chatId = '7607805295';
  
  // ตัดข้อความให้ไม่เกิน 4096 ตัวอักษร (ข้อจำกัดของ Telegram)
  if (message.length > 4096) {
    message = message.substring(0, 4093) + "...";
  }
  
  var url = `https://api.telegram.org/bot${telegramApiToken}/sendMessage`;
  var payload = {
    chat_id: chatId,
    text: message,
    parse_mode: "Markdown"
  };
  
  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload)
  };
  
  try {
    var response = UrlFetchApp.fetch(url, options);
    Logger.log("Response: " + response.getContentText());
  } catch (error) {
    Logger.log("Error: " + error.name + " - " + error.message);
  }
}


