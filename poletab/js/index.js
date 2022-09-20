document.addEventListener("DOMContentLoaded", function (event) {
    check_def_search_engine();
    check_background_data();

/* choose default browser func s */

/* google */
    $("#btn-cdb1").click(function () {
        localStorage.setItem("search_engine_use", "https://www.google.com/search");
        location.reload();
    });
/* bing */
    $("#btn-cdb2").click(function () {
        localStorage.setItem("search_engine_use", "https://www.bing.com/search");
        location.reload();
    });
/* yahoo */
    $("#btn-cdb3").click(function () {
        localStorage.setItem("search_engine_use", "https://search.yahoo.com/search;_ylt=");
        location.reload();
    });
/* duck duck go */
    $("#btn-cdb4").click(function () {
        localStorage.setItem("search_engine_use", "https://duckduckgo.com/");
        location.reload();
    });
/* yandex */
    $("#btn-cdb5").click(function () {
        localStorage.setItem("search_engine_use", "https://yandex.com/search/");
        location.reload();
    });
    

/* choose default browser func e */

/* input on key event */
    $("#input_search_engine").keypress(function (event) {
        var q = $("#input_search_engine").val();
        if (event.keyCode === 13) {
            $("#input_search_engine2").val(q).show();
            $("#input_search_engine").hide().val("");
        }
    });

/* chnage default search engine */
    $("#change_default_search_engine").click(function () {
        $("#div-chdb").css({ "background-color": "whitesmoke" }).fadeIn();
        $("#div-main-menu").fadeOut();
    });
    
/* save and edit background */
    document.getElementById('input_image_background').addEventListener('change', check_and_save_image);
/* save and edit background position */
    $("#input_background_position").on("change", function () {
        var position = $("#input_background_position").val();
        change_background_position(position);
    });
    

/* setting button */
    $("#btn-open-setting").click(function () {
        check_all_function_in_menu();
        $("#div-main-menu-back").fadeIn();
        $("#div-main-menu").fadeIn();
    });
    $("#btn-close-setting").click(function () {
        $("#div-main-menu-back").fadeOut();
        $("#div-main-menu").fadeOut();

        $("#div-ifi").fadeOut();
        $("#label_input_image_background").delay(500).fadeIn();
        $("#btn-ifi").delay(500).fadeIn();
    });
    $("#div-main-menu-back").click(function () {
        $("#div-main-menu-back").fadeOut();
        $("#div-main-menu").fadeOut();
        $("#div-chdb").fadeOut();
        $("#div-credits").fadeOut();

        $("#div-ifi").fadeOut();
        $("#label_input_image_background").delay(500).fadeIn();
        $("#btn-ifi").delay(500).fadeIn();
    });


/* input search color picker */
    document.getElementById('input_search_color_picker').addEventListener('change', input_search_color_picker);
/* input search text color picker */
    document.getElementById('input_text_search_color_picker').addEventListener('change', input_search_text_color_picker);
/* input search div position */
    document.getElementById('input_search_div_position').addEventListener('change', input_search_div_position);


    $("#remove").click(function () {
        localStorage.removeItem("used_background");
    })

    $("#a").click(function () {
        localStorage.removeItem("search_engine_use");
        location.reload();
    });



/* credits s */
    $("#btn-credits").click(function () {
        $("#div-main-menu").fadeOut();
        $("#div-credits").fadeIn();
    });
/* credits e */

/* input from image btn */
    $("#btn-ifi").click(function(){
        $("#label_input_image_background").fadeOut();
        $("#btn-ifi").fadeOut();
        $("#div-ifi").delay(700).fadeIn();
    });
/* confirm picture from url */
    $("#btn-input-url-confirm").click(function () {
        var pic_url = $("#input_url_background_source").val();
        save_picture_from_internet(pic_url);
    });

});


/* ---------------------- function place ------------------------------ */

/* check background */
function check_background_data() {
    ldb.get('used_background', function (value) {
        if (value == null) {
            ldb.set('used_background', "picture/default-background.jpg");
            location.reload();
        } else {
            $('#pagebody').css({'background-image': 'url("' + value + '")'}).fadeIn();
        }
    });
    check_background_position();
}

/* check search background position */
function check_background_position() {
    var background_position = localStorage.used_background_position;
    if (background_position == null) {
        localStorage.setItem("used_background_position", "center");
    } else {
        $('#pagebody').css({ "background-position": background_position });
        $("#input_background_position").val(background_position).change();
    }
}

function check_def_search_engine() {
    var def_search_engine = localStorage.search_engine_use;
    if (def_search_engine == null) {
        $("#div-chdb").show();
    } else {
        mainpage();
    }
}

/* execute all main function */
function mainpage() {
    $("#maindiv").show();
    var search_engine_use = localStorage.search_engine_use;
    $("#mp-search-form").attr('action', search_engine_use);

    /* check and change logo on search btn based on search engine that users use */
    if (search_engine_use == "https://www.google.com/search") {
        $("#btn-search-img").attr("src", "picture/google.png");
    } else if (search_engine_use == "https://www.bing.com/search") {
        $("#btn-search-img").attr("src", "picture/bing.png");
    }else if (search_engine_use == "https://search.yahoo.com/search;_ylt=") {
        $("#btn-search-img").attr("src", "picture/yahoo.png");
    }else if (search_engine_use == "https://duckduckgo.com/") {
        $("#btn-search-img").attr("src", "picture/duckduckgo.png");
    }else if (search_engine_use == "https://yandex.com/search/") {
        $("#btn-search-img").attr("src", "picture/yandex.png");
        $("#input_search_engine2").attr("name", "text");
    }
/* check search text color, background color, position */
    var input_search_background_color = localStorage.input_search_background_color;
    var input_search_text_color = localStorage.input_search_text_color;
    var input_search_div_position = localStorage.input_search_div_position;
    if (input_search_background_color != null) {
        $("#search-div-default").css({ "background-color": input_search_background_color });
        $("#input_search_color_picker").val(input_search_background_color);
    }
    if (input_search_text_color != null) {
        $('body').append('<style>.input-search::placeholder{color:' + input_search_text_color + '}.input-search{color: '+input_search_text_color+'}</style>');
        $("#input_text_search_color_picker").val(input_search_text_color);
    }
    if (input_search_div_position != null) {
        $("#search-div-default").removeClass("search-div-top").addClass("search-div-" + input_search_div_position);
        $("#input_search_div_position").val(input_search_div_position).change();
    }
}

function check_all_function_in_menu() {
    var input_search_background_color = localStorage.input_search_background_color;
    var input_search_text_color = localStorage.input_search_text_color;
    var input_search_div_position = localStorage.input_search_div_position;
    if (input_search_background_color != null) {
        $("#input_search_color_picker").val(input_search_background_color);
    }
    if (input_search_text_color != null) {
        $("#input_text_search_color_picker").val(input_search_text_color);
    }
    if (input_search_div_position != null) {
        $("#input_search_div_position").val(input_search_div_position).change();
    }
}

/* check search input opacity */
function search_input_opacity() {
    
}

/* check form position */
function check_form_position() {
    var search_form_position = localStorage.search_form_position;
    if (search_form_position == null) {
        
    } else if (search_form_position == "center") {
        
    } else if (search_form_position == "bottom") {
        
    }
}

/* save picture url */
function save_picture_from_internet(pic_url){
    ldb.set('used_background', pic_url);
    location.reload();
}

function change_background_position(position) {
    localStorage.setItem("used_background_position", position);
    $('#pagebody').css({ "background-position": position });
}

/*save background use base64 */
function check_and_save_image(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img style="width: 100%;" class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
            
            $("#image_background_preview").html(span);

            var string = e.target.result;
            ldb.set('used_background', string);
            check_background_data();
        };
      })(f);

      // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}

function input_search_color_picker() {
    var color = $("#input_search_color_picker").val();
    $("#search-div-default").css("background-color", color);
    localStorage.setItem("input_search_background_color", color);
}
function input_search_text_color_picker() {
    var color = $("#input_text_search_color_picker").val();
    localStorage.setItem("input_search_text_color", color);
}
function input_search_div_position() {
    var position_bef = localStorage.input_search_div_position;
    var position_aft = $("#input_search_div_position").val();
    if (position_bef != null) {
        $("#search-div-default").removeClass("search-div-" + position_bef).addClass("search-div-" + position_aft);
    } else {
        $("#search-div-default").removeClass("search-div-top").addClass("search-div-" + position_aft);
    }
    localStorage.setItem("input_search_div_position", position_aft);
}



/* database function */
(function() {
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    if (!indexedDB) {
      console.error('indexDB not supported');
      return;
    }
    var db,
      keyValue = {
        k: '',
        v: ''
      },
      request = indexedDB.open('d2', 1);
    request.onsuccess = function(evt) {
      db = this.result;
    };
    request.onerror = function(event) {
      console.error('indexedDB request error');
      console.log(event);
    };
  
    request.onupgradeneeded = function(event) {
      db = null;
      var store = event.target.result.createObjectStore('str', {
        keyPath: 'k'
      });
  
      store.transaction.oncomplete = function (e){
        db = e.target.db; 
      };
    };
  
    function getValue(key, callback) {
      if(!db) {
        setTimeout(function () {
          getValue(key, callback);
        }, 100);
        return;
      }
      db.transaction('str').objectStore('str').get(key).onsuccess = function(event) {
        var result = (event.target.result && event.target.result.v) || null;
        callback(result);
      };
    }
  
    // if using proxy mode comment this
  
    window['ldb'] = {
      get: getValue,
      set: function(key, value) {
        // no callback for set needed because every next transaction will be anyway executed after this one
        keyValue.k = key;
        keyValue.v = value;
        db.transaction('str', 'readwrite').objectStore('str').put(keyValue);
      }
    }
  
    // Use only for apps that will only work on latest devices only
  
    // window.ldb = new Proxy({}, {
    //   get: function(func, key, callback) {
    //     return (key === 'get') ? getValue : function(callback) {
    //       return getValue(key, callback)
    //     };
    //   },
    //   set: function(func, key, value) {
    //     keyValue.k = key;
    //     keyValue.v = value;
    //     db.transaction('str', 'readwrite').objectStore('str').put(keyValue);
    //   }
    // });
  })();