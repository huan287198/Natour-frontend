$(document).ready(function() {
  $().ready(function() {
    $(".username").click(e => {
      $("#collapseExample")
        .toggleClass("collapse expand")
    });

    $sidebar = $(".sidebar");

    $sidebar_img_container = $sidebar.find(".sidebar-background");

    $full_page = $(".full-page");

    $sidebar_responsive = $("body > .navbar-collapse");

    window_width = $(window).width();

    fixed_plugin_open = $(
      ".sidebar .sidebar-wrapper .nav li.active a p"
    ).html();

    if (window_width > 767 && fixed_plugin_open == "Dashboard") {
      if ($(".fixed-plugin .dropdown").hasClass("show-dropdown")) {
        $(".fixed-plugin .dropdown").addClass("open");
      }
    }

    $(".fixed-plugin a").click(function(event) {
      // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
      if ($(this).hasClass("switch-trigger")) {
        if (event.stopPropagation) {
          event.stopPropagation();
        } else if (window.event) {
          window.event.cancelBubble = true;
        }
      }
    });

    $(".fixed-plugin .active-color span").click(function() {
      $full_page_background = $(".full-page-background");

      $(this)
        .siblings()
        .removeClass("active");
      $(this).addClass("active");

      var new_color = $(this).data("color");

      if ($sidebar.length != 0) {
        $sidebar.attr("data-color", new_color);
      }

      if ($full_page.length != 0) {
        $full_page.attr("filter-color", new_color);
      }

      if ($sidebar_responsive.length != 0) {
        $sidebar_responsive.attr("data-color", new_color);
      }
    });

    $(".fixed-plugin .background-color .badge").click(function() {
      $(this)
        .siblings()
        .removeClass("active");
      $(this).addClass("active");

      var new_color = $(this).data("background-color");

      if ($sidebar.length != 0) {
        $sidebar.attr("data-background-color", new_color);
      }
    });

    $(".fixed-plugin .img-holder").click(function() {
      $full_page_background = $(".full-page-background");

      $(this)
        .parent("li")
        .siblings()
        .removeClass("active");
      $(this)
        .parent("li")
        .addClass("active");

      var new_image = $(this)
        .find("img")
        .attr("src");

      if (
        $sidebar_img_container.length != 0 &&
        $(".switch-sidebar-image input:checked").length != 0
      ) {
        $sidebar_img_container.fadeOut("fast", function() {
          $sidebar_img_container.css(
            "background-image",
            'url("' + new_image + '")'
          );
          $sidebar_img_container.fadeIn("fast");
        });
      }

      if (
        $full_page_background.length != 0 &&
        $(".switch-sidebar-image input:checked").length != 0
      ) {
        var new_image_full_page = $(".fixed-plugin li.active .img-holder")
          .find("img")
          .data("src");

        $full_page_background.fadeOut("fast", function() {
          $full_page_background.css(
            "background-image",
            'url("' + new_image_full_page + '")'
          );
          $full_page_background.fadeIn("fast");
        });
      }

      if ($(".switch-sidebar-image input:checked").length == 0) {
        var new_image = $(".fixed-plugin li.active .img-holder")
          .find("img")
          .attr("src");
        var new_image_full_page = $(".fixed-plugin li.active .img-holder")
          .find("img")
          .data("src");

        $sidebar_img_container.css(
          "background-image",
          'url("' + new_image + '")'
        );
        $full_page_background.css(
          "background-image",
          'url("' + new_image_full_page + '")'
        );
      }

      if ($sidebar_responsive.length != 0) {
        $sidebar_responsive.css("background-image", 'url("' + new_image + '")');
      }
    });

    $(".switch-sidebar-image input").change(function() {
      $full_page_background = $(".full-page-background");

      $input = $(this);

      if ($input.is(":checked")) {
        if ($sidebar_img_container.length != 0) {
          $sidebar_img_container.fadeIn("fast");
          $sidebar.attr("data-image", "#");
        }

        if ($full_page_background.length != 0) {
          $full_page_background.fadeIn("fast");
          $full_page.attr("data-image", "#");
        }

        background_image = true;
      } else {
        if ($sidebar_img_container.length != 0) {
          $sidebar.removeAttr("data-image");
          $sidebar_img_container.fadeOut("fast");
        }

        if ($full_page_background.length != 0) {
          $full_page.removeAttr("data-image", "#");
          $full_page_background.fadeOut("fast");
        }

        background_image = false;
      }
    });

    $(".switch-sidebar-mini input").change(function() {
      $body = $("body");

      $input = $(this);

      if (md.misc.sidebar_mini_active == true) {
        $("body").removeClass("sidebar-mini");
        md.misc.sidebar_mini_active = false;

        $(".sidebar .sidebar-wrapper, .main-panel").perfectScrollbar();
      } else {
        $(".sidebar .sidebar-wrapper, .main-panel").perfectScrollbar("destroy");

        setTimeout(function() {
          $("body").addClass("sidebar-mini");

          md.misc.sidebar_mini_active = true;
        }, 300);
      }

      // we simulate the window Resize so the charts will get updated in realtime.
      var simulateWindowResize = setInterval(function() {
        window.dispatchEvent(new Event("resize"));
      }, 180);

      // we stop the simulation of Window Resize after the animations are completed
      setTimeout(function() {
        clearInterval(simulateWindowResize);
      }, 1000);
    });
  });
});

function setFormValidation(id) {
  $(id).validate({
    highlight: function(element) {
      $(element)
        .closest(".form-group")
        .removeClass("has-success")
        .addClass("has-danger");
      $(element)
        .closest(".form-check")
        .removeClass("has-success")
        .addClass("has-danger");
    },
    success: function(element) {
      $(element)
        .closest(".form-group")
        .removeClass("has-danger")
        .addClass("has-success");
      $(element)
        .closest(".form-check")
        .removeClass("has-danger")
        .addClass("has-success");
    },
    errorPlacement: function(error, element) {
      $(element)
        .closest(".form-group")
        .append(error);
    }
  });
}

function loginDashBoard(){
    $("#LoginValidation button").on("click", (event) => {
        const $button = $("#LoginValidation button");
        $button.html("Loading...");
        const username = $("#LoginValidation #userName").val();
        const password = $("#LoginValidation #examplePasswords").val();
       if(username !== "" && password !== ""){
           $.ajax({
               url: "?route=auth",
               type: "POST",
               data:{
                   userName: username,
                   password: password,
                   checkLogin: true
               },
               dataType: "text",
               success: function (data) {
                   if(!data.includes("isLoggedIn")){
                       $.notify({
                           icon: "error",
                           title: 'Login failed',
                           message: "Wrong username or password! Try again"
                       }, {
                           type: "danger",
                           timer: 2500,
                           placement: {
                               from: "top",
                               align: "right"
                           },
                           allow_dismiss: true
                       })
                       $button.html("Login");
                   } else {
                       window.location.href="?route=admin";
                   }
               },
               error: function () {
                 $button.html("Login");
               }
           })
       } else {
           setFormValidation("#LoginValidation");
           $button.html("Login");
       }
    })
}

$(document).ready(function() {
    md.checkFullPageBackgroundImage();
    setTimeout(function() {
        // after 1000 ms we add the class animated to the login/register card
        $('.card').removeClass('card-hidden');
    }, 700);
    loginDashBoard();
    setFormValidation("#RegisterForm");
    setFormValidation("#UpdateForm");
    class wilField {
        constructor(el) {
            this.el = $(el);
            return this.init();
        }
        init() {
            this.el.each(index => {
                const self = $(this.el[index]);
                const field = $("input, textarea", self);
                const file = $('input[type="file"]', self);
                this.inputText(field, self);
                self.on("click", ".input-upload, .input-filename", event =>
                    this.handleClickFile(event, field)
                );
                file.on("change", event => this.typeFile(event, self));
            });
        }
        inputText(field, self) {
            const rightButton = $(".js-field-rightButton", self);
            let val = "";

            // if( field.val() !== '') {
            // 	self.addClass('active');
            // }

            field.focus(() => self.addClass("active"));

            field.keyup(event => {
                val = $(event.currentTarget).val();
                if (val !== "") self.addClass("active");
                if (rightButton.length) {
                    if (val !== "") {
                        rightButton.addClass("active");
                    } else {
                        rightButton.removeClass("active");
                    }
                }
            });
            field.blur(() => self.removeClass(val === "" ? "active" : ""));
            if (self.hasClass("select-text")) {
                field.on("click", event =>
                    event.currentTarget.setSelectionRange(
                        0,
                        event.currentTarget.value.length
                    )
                );
            }
        }
        handleClickFile(event, field) {
            event.preventDefault();
            field.trigger("click");
        }
        typeFile(event, self) {
            const fileName = $(".input-filename", self);
            const fileimg = $(".input-fileimg", self);
            let getfileName = $(event.currentTarget)
                .val()
                .replace(/\\/g, "/")
                .replace(/.*\//, "");
            fileName.attr("data-text", getfileName);
            if (getfileName !== "") self.addClass("active");

            if (event.currentTarget.files && event.currentTarget.files[0]) {
                let reader = new FileReader();
                reader.onload = function(e) {
                    fileimg.css({
                        "background-image": `url("${e.target.result}")`
                    });
                };
                reader.readAsDataURL(event.currentTarget.files[0]);
            }
            if (fileName.attr("data-text") === "") {
                fileimg.css("background-image", "");
                self.removeClass("active");
            }
        }
    }

    new wilField(".field__module");
});
