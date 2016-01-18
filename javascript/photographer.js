

/* 
 * @author: Darwin Themes
 */

$(document).ready(function() {
    $("#contact-form").submit(function() {
        photographer.send_contact_email();
    });
});

var photographer = (function($) {
    "use strict";
    var url = "functions.php";
    function send_contact_email() {
        $("#confirm-message").remove();
        var send = true;
        $("#contact-form").find('[required]').each(function() {
            if ($(this).val() == "") {
                send = false;
            }
        });
        if (send) {
            $.post(
                    url,
                    {
                        action: "send_contact_email",
                        name: $("#contact-form").find("#ca").val(),
                        email: $("#contact-form").find("#cb").val(),
                        phone: $("#contact-form").find("#cc").val(),
                        company: $("#contact-form").find("#cd").val(),
                        message: $("#contact-form").find("#ce").val(),
                    },
                    function(response) {
                        if (response['status'] == true)
                        {
                            $("label").removeAttr("style");
                            $("#contact-form").find("#ca").val("");
                            $("#contact-form").find("#cb").val("");
                            $("#contact-form").find("#cc").val("");
                            $("#contact-form").find("#cd").val("");
                            $("#contact-form").find("#ce").val("");
                            $("#contact-form").prepend('<p id="confirm-message"><span style="padding-left:20px;">Your message has been sent.</span></p>');
                        } else {
                            $("#contact-form").prepend('<p id="confirm-message"><span style="padding-left:20px;">' + response.details + '</span></p>');
                        }
                    }, 'json');
        }
    }
    return {
        send_contact_email: send_contact_email,
    };
})(jQuery);

