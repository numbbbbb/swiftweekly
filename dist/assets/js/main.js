$(function() {
  function checkemail(val) {
    if (!val.trim()) {
      return false
    }
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    return re.test(val)
  }

  $(".sub").click(function() {
    $("#content").submit()
  })
  $("#content").submit(function(e) {
    e.preventDefault()
    if (!checkemail($("#email").val())) {
      setTimeout('$("#email").focus()', 100)
      return
    }
    $("#email").addClass("disabled")
    $(".sub").addClass("disabled").text("稍等")
    $.getJSON("http://ggchecker.githuber.info/addemail/" + $("#email").val().trim(), function(data) {
      if (data["success"] == "success") {
        $(".main").html("<h3 style='color: #666'>订阅成功！多谢支持！</h3>")
      }
    })
  })
})