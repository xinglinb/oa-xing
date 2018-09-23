export default {
  setCookie: function (cname, cvalue, exdays) {
    console.log(cname, cvalue, exdays);

    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  },

  getCookie: function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
    }
    return "";
  },
  clearCookie: function () {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (var i = keys.length; i--;)
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
  },
  checkCookie: function () {
    var user = this.getCookie("username");
    if (user !== "") {
      alert("Welcome again " + user);
    } else {
      user = prompt("Please enter your name:", "");
      if (user !== "" && user !== null) {
        this.setCookie("username", user, 365);
      }
    }
  }
}
