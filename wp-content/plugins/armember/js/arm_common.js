function armToast(message, type, time, reload) {
    if (reload == '' || typeof reload == 'undefined') {
        reload = false;
    }
    if (time == '' || typeof time == 'undefined') {
        var time = 2500;
    }
    var msgWrapperID = 'arm_error_message';
    if (type == 'success') {
        var msgWrapperID = 'arm_success_message';
    } else if (type == 'error') {
        var msgWrapperID = 'arm_error_message';
    } else if (type == 'info') {
        var msgWrapperID = 'arm_error_message';
    }
    var toastHtml = '<div class="arm_toast arm_message ' + msgWrapperID + '" id="' + msgWrapperID + '"><div class="arm_message_text">' + message + '</div></div>';
    if (jQuery('.arm_toast_container .arm_toast').length > 0) {
        jQuery('.arm_toast_container .arm_toast').remove();
    }
    jQuery(toastHtml).appendTo('.arm_toast_container').show('slow').addClass('arm_toast_open').delay(time).queue(function () {
        if (type != 'error' && type != 'buddypress_error') {
            var $toast = jQuery(this);
            jQuery('.arm_already_clicked').removeClass('arm_already_clicked').removeAttr('disabled');
            $toast.addClass('arm_toast_close');
            if (reload === true) {
                location.reload();
            }
            setTimeout(function () {
                $toast.remove();
            }, 1000);
        } else {
            var $toast = jQuery(this);
            $toast.addClass('arm_toast_close');
            setTimeout(function () {
                $toast.remove();
            }, 1000);
        }
    });
}
function armCopyToClipboard(text)
{
    var textArea = document.createElement("textarea");
    textArea.id = 'armCopyTextarea';
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.getElementById("armCopyTextarea").select();
    var successful = false;
    try {
        var successful = document.execCommand('copy');
    } catch (err) {
    }
    document.body.removeChild(textArea);
    return successful;
}
jQuery(document).ready(function ($) {
    if (jQuery.isFunction(jQuery().datetimepicker)) {
        jQuery('.arm_datepicker').each(function () {
            var $this = jQuery(this);
            var dateToday = new Date();
            var locale = $this.attr('data-cal_localization');
            var curr_form = $this.attr('data-date_field');
            var dateformat = $this.attr('data-dateformat');
            var show_timepicker = $this.attr('data-show_timepicker');
            if (dateformat == '' || typeof dateformat == 'undefined') {
                dateformat = 'MM/DD/YYYY';
            }
            if (show_timepicker != '' && typeof show_timepicker != 'undefined' && show_timepicker == 1) {
                dateformat = dateformat + ' hh:mm A';
            }

            $this.datetimepicker({
                useCurrent: false,
                format: dateformat,
                locale: locale,
            }).on("dp.change", function (e) {
                jQuery(this).trigger('input');
            });
        });
    }
    jQuery('input.armRepeatPasswordInput').each(function () {
        var ngModel = jQuery(this).parents('.armRepeatPasswordInput').find('input[name="user_pass"]').attr('ng-model');
        jQuery(this).attr('compare', ngModel);
    });

    jQuery(document).ready(function () {
        jQuery('input.arm_module_plan_input:checked').each(function () {
            armSetupHideShowSections(jQuery(this).parents('.arm_membership_setup_form'));
        });
    });

    jQuery(document).on('change', "input.arm_module_plan_input", function () {
        if (jQuery('input:radio[name="arm_selected_payment_mode"]').length) {
            jQuery('input:radio[name="arm_selected_payment_mode"]').filter('[value="auto_debit_subscription"]').attr('checked', true).trigger('change');
        }
        armSetupHideShowSections(jQuery(this).parents('.arm_membership_setup_form'));
    });


    jQuery(document).on('click', '.arm_login_popup_form_links', function () {
        var form_id = jQuery(this).attr('data-form_id');
        jQuery('.' + form_id).trigger('click');
    });
    if (jQuery.isFunction(jQuery().bPopup))
    {
        jQuery(document).on('click', '.arm_form_popup_link', function (e) {
            var form_id = jQuery(this).attr('data-form_id');
            var overlay = jQuery(this).attr('data-overlay');
            overlay = (overlay != '') ? overlay : 0.5;
            var modal_bg = jQuery(this).attr('data-modal_bg');
            modal_bg = (modal_bg != '') ? modal_bg : '#000000';
            jQuery('.popup_close_btn').trigger('click');
            jQuery('.arm_popup_member_form_' + form_id).bPopup({
                opacity: overlay,
                modalColor: modal_bg,
                closeClass: 'popup_close_btn',
                zIndex: 99999,
                follow: [false, false],
                onClose: function () {
                    arm_adjust_form_popup();
                    arm_reset_form_popup('arm_popup_member_form_' + form_id);
                    if( jQuery('.md-select-backdrop').length > 0 ){
                        jQuery('.md-select-backdrop').trigger('click');
                    }
                },
                onOpen: function () {
                    var popup_length = jQuery('.arm_popup_member_form_' + form_id).length;
                    if (popup_length > 1) {
                        jQuery('.arm_popup_wrapper.arm_popup_member_form_' + form_id).each(function (n) {
                            $this = jQuery(this);
                            if ((n + 1) > 1) {
                                setTimeout(function () {
                                    $this.css('display', 'none');
                                }, 10);
                            }
                        });
                    }
                }
            });
            setTimeout(function () {
                arm_adjust_form_popup();
            }, 10);
        });
        jQuery(document).on('click', '.arm_modal_forgot_form_link', function () {
            var form_id = jQuery(this).attr('data-form_id');
            jQuery('.arm_modal_forgot_form_' + form_id).bPopup({
                opacity: 0.5,
                closeClass: 'popup_close_btn',
                follow: [false, false],
                onOpen: function () {
                    var popup_length = jQuery('.arm_modal_forgot_form_' + form_id).length;
                    if (popup_length > 1) {
                        jQuery('.arm_popup_wrapper.arm_modal_forgot_form_' + form_id).each(function (n) {
                            $this = jQuery(this);
                            if ((n + 1) > 1) {
                                setTimeout(function () {
                                    $this.css('display', 'none');
                                }, 10);
                            }
                        });
                    }
                },
                onClose:function() {
                    if( jQuery('.md-select-backdrop').length > 0 ){
                        jQuery('.md-select-backdrop').trigger('click');
                    }
                }
            });
        });

        jQuery(document).on('click', '.arm_setup_form_popup_link', function () {
            var form_id = jQuery(this).attr('data-form_id');
            var overlay = jQuery(this).attr('data-overlay');
            overlay = (overlay != '') ? overlay : 0.5;
            var modal_bg = jQuery(this).attr('data-modal_bg');
            modal_bg = (modal_bg != '') ? modal_bg : '#000000';
            jQuery('.popup_close_btn').trigger('click');
            jQuery('.arm_popup_member_setup_form_' + form_id).bPopup({
                opacity: overlay,
                modalColor: modal_bg,
                closeClass: 'popup_close_btn',
                zIndex: 99999,
                follow: [false, false],
                onClose: function () {
                    arm_adjust_form_popup();
                    arm_reset_form_popup('arm_popup_member_setup_form_' + form_id);
                    if( jQuery('.md-select-backdrop').length > 0 ){
                        jQuery('.md-select-backdrop').trigger('click');
                    }
                },
                onOpen: function () {
                    var popup_length = jQuery('.arm_popup_member_setup_form_' + form_id).length;
                    if (popup_length > 1) {
                        jQuery('.arm_popup_wrapper.arm_popup_member_setup_form_' + form_id).each(function (n) {
                            $this = jQuery(this);
                            if ((n + 1) > 1) {
                                setTimeout(function () {
                                    $this.css('display', 'none');
                                }, 10);
                            }
                        });
                    }
                }
            });
            setTimeout(function () {
                arm_adjust_form_popup();
                arm_equal_hight_setup_plan();
            }, 10);
        });

    }
    arm_current_membership_init();
    arm_transaction_init();
    arm_tooltip_init();
    arm_set_plan_width();
    arm_set_directory_template_style();
    arm_do_bootstrap_angular();
    arm_icheck_init();
});
jQuery(window).load(function () {
    setTimeout(function () {
        arm_equal_hight_setup_plan();
    }, 500);
    armAdjustAccountTabs();
    armAdjustDirectoryTemplateBox();
});
jQuery(window).load(function () {
    setTimeout(function () {
        jQuery('.arm_setup_form_container').show();
    }, 100);
});

jQuery(window).resize(function () {
    arm_adjust_form_popup();
    arm_equal_hight_setup_plan();
    armAdjustAccountTabs();
    armAdjustDirectoryTemplateBox();
});

function arm_reset_form_popup(className)
{
    var form = jQuery('.' + className).find('form');
    if (form.length > 0)
    {

        var id = jQuery('.' + className).find('form').attr('id');

        var formScope = angular.element(document.getElementById(id)).scope();
        formScope.resetForm(formScope.arm_form, id);
        formScope.$apply();

    }
}

function arm_adjust_form_popup() {
    jQuery('.arm_popup_member_form').each(function () {
        var formW = jQuery(this).attr('data-width');
        var windowH = jQuery(window).height();
        var windowW = jQuery(window).width();
        if (windowW < (formW)) {
            jQuery(this).css({'top': '0'});
            jQuery(this).addClass('popup_wrapper_responsive');
            jQuery(this).find('.popup_content_text').css({'height': (windowH - 65) + 'px'});
        } else {
            if (jQuery(this).height() > windowH) {
                var top = jQuery(window).scrollTop() + 50;
                jQuery(this).css({'top': top + 'px'});
            } else {
                var top = jQuery(window).scrollTop() + ((windowH - (jQuery(this).height())) / 2);
                jQuery(this).css({'top': top + 'px'});
            }
            jQuery(this).removeClass('popup_wrapper_responsive');
            var contentH = jQuery(this).find('.popup_content_text').attr('data-height');
            jQuery(this).find('.popup_content_text').css({'height': contentH});
        }
        var left = (windowW - formW) / 2;
        jQuery(this).css({'left': left + 'px'});
    });
    jQuery('.arm_popup_member_setup_form').each(function () {
        var formW = jQuery(this).attr('data-width');
        var windowH = jQuery(window).height();
        var windowW = jQuery(window).width();
        if (windowW < (formW)) {
            jQuery(this).css({'top': 0 + 'px'});
            jQuery(this).addClass('popup_wrapper_responsive');
            jQuery(this).find('.popup_content_text').css({'height': (windowH - 65) + 'px'});
        } else {
            if (jQuery(this).height() > windowH) {
                var top = jQuery(window).scrollTop() + 50;
                jQuery(this).css({'top': top + 'px'});
            } else {
                var top = jQuery(window).scrollTop() + ((windowH - (jQuery(this).height())) / 2);
                jQuery(this).css({'top': top + 'px'});
            }
            jQuery(this).removeClass('popup_wrapper_responsive');
            var contentH = jQuery(this).find('.popup_content_text').attr('data-height');
            jQuery(this).find('.popup_content_text').css({'height': contentH});
        }
        var left = (windowW - formW) / 2;
        jQuery(this).css({'left': left + 'px'});
    });
}

function armSetupHideShowSections(setupForm)
{

    var gateway_skin = jQuery(setupForm).find('#arm_front_gateway_skin_type').val();
    var plan_skin = jQuery(setupForm).find('#arm_front_plan_skin_type').val();

    if (plan_skin == 'skin5')
    {
        var container = jQuery(setupForm).find('.arm_module_plan_input').attr('aria-owns');
        var planInput = jQuery('#'+container).find('md-option:selected');
        var selected_plan = planInput.attr('value');
    }
    else
    {
        var planInput = jQuery(setupForm).find('input.arm_module_plan_input:checked');
        var selected_plan = planInput.val();
    }

    var plan_type = planInput.attr('data-type');
    var total_cycle = planInput.attr('data-cycle');
    var user_selected_payment_mode = jQuery(setupForm).find('#arm_user_selected_payment_mode_' + selected_plan).val();
    var user_old_plan_ids = jQuery(setupForm).find('#arm_user_old_plan').val();
  

    
    if(user_old_plan_ids == undefined){

    var user_old_plan = [];
        
    }
    else{

        if(user_old_plan_ids.search( ',' )){
    var user_old_plan = user_old_plan_ids.split(',');
}
else{
    var user_old_plan = [];
}

  
        
    }


    var user_old_plan_cycle = jQuery(setupForm).find('#arm_user_old_plan_total_cycle_' + selected_plan).val();
    var user_last_payment_status = jQuery(setupForm).find('#arm_user_last_payment_status_'+ selected_plan).val();
    var user_old_plan_done_payment = jQuery(setupForm).find('#arm_user_done_payment_' + selected_plan).val();
    var user_selected_payment_cycle = jQuery(setupForm).find('#arm_user_selected_payment_cycle_' + selected_plan).val();

    if (gateway_skin == 'radio') {
        var selected_gateway_obj = jQuery(setupForm).find('.arm_module_gateway_input:checked');
        var selected_gateway = jQuery(setupForm).find('.arm_module_gateway_input:checked').val();
    } else {
        var container = jQuery(setupForm).find('.arm_module_gateway_input').attr('aria-owns');
        var selected_gateway_obj = jQuery('#'+container).find('md-option:selected');
        var selected_gateway = jQuery('#'+container).find('md-option:selected').attr('value');
    }

    var payment_mode = selected_gateway_obj.attr('data-payment_mode');

    jQuery(setupForm).find('.arm_module_plans_ul').find('.arm_setup_column_item').removeClass("arm_active");
    jQuery(planInput).parents('.arm_setup_column_item').addClass("arm_active");
    jQuery(setupForm).find('input[name="arm_plan_type"]').val(plan_type).trigger('change');

    if (plan_type == 'free') {
        jQuery(setupForm).find('.arm_setup_gatewaybox_wrapper').hide('slow');
        jQuery(setupForm).find('.arm_payment_mode_wrapper').hide('slow');
        jQuery(setupForm).find('.arm_setup_paymentcyclebox_wrapper').slideUp('slow').addClass('arm_hide');
    } else {
        if (plan_type == 'recurring' && jQuery.inArray(selected_plan, user_old_plan) != -1 && (user_old_plan_cycle != user_old_plan_done_payment || user_old_plan_cycle == 'infinite') && user_selected_payment_mode == 'manual_subscription')
        {

            jQuery(setupForm).find('.arm_payment_mode_wrapper').hide();
            jQuery(setupForm).find('.arm_setup_couponbox_wrapper').hide('slow');

            if (plan_skin == 'skin5')
            {
                 var scope = angular.element('[data-ng-controller=ARMCtrl]').scope();
                 scope.arm_form['payment_cycle_'+selected_plan] = user_selected_payment_cycle;
            }
            else{

                jQuery(setupForm).find('input:radio[name="payment_cycle_' + selected_plan + '"]').filter('[value="' + user_selected_payment_cycle + '"]').attr('checked', 'checked').trigger('change');
            }
            
            jQuery(setupForm).find('.arm_setup_paymentcyclebox_wrapper').slideUp('slow').addClass('arm_hide');
        }
        else
        {

            if (plan_type == 'recurring') {


            	if(user_last_payment_status == 'failed'){
            		jQuery(setupForm).find('.arm_payment_mode_wrapper').hide();
		            jQuery(setupForm).find('.arm_setup_couponbox_wrapper').hide('slow');
                    if (plan_skin == 'skin5')
                    {
                         var scope = angular.element('[data-ng-controller=ARMCtrl]').scope();
                         scope.arm_form['payment_cycle_'+selected_plan] = user_selected_payment_cycle;
                    }
                    else{
                        jQuery(setupForm).find('input:radio[name="payment_cycle_' + selected_plan + '"]').filter('[value="' + user_selected_payment_cycle + '"]').attr('checked', 'checked').trigger('change');
                    }
		            
		            jQuery(setupForm).find('.arm_setup_paymentcyclebox_wrapper').slideUp('slow').addClass('arm_hide');


            	}
            	else{

                   

            		jQuery(setupForm).find('.arm_module_payment_cycle_container').not('.arm_payment_cycle_box_' + selected_plan).slideUp('slow').addClass('arm_hide');
	                jQuery(setupForm).find('.arm_payment_cycle_box_' + selected_plan).slideDown('slow').removeClass('arm_hide');
	               
	                if(total_cycle > 1){
	                    jQuery(setupForm).find('.arm_setup_paymentcyclebox_wrapper').slideDown('slow').removeClass('arm_hide');
                        jQuery(setupForm).find('.arm_setup_payment_cycle_title_wrapper').slideDown('slow').removeClass('arm_hide');
	                }
	                else{
	                     jQuery(setupForm).find('.arm_setup_paymentcyclebox_wrapper').slideUp('slow').addClass('arm_hide');
	                    jQuery(setupForm).find('.arm_setup_payment_cycle_title_wrapper').slideUp('slow').addClass('arm_hide');
	                }
                   
                    var selected_cycle = jQuery(setupForm).find('#arm_payment_cycle_plan_' + selected_plan).val();
                    if (plan_skin == 'skin5')
                    {
                         var scope = angular.element('[data-ng-controller=ARMCtrl]').scope();
                         scope.arm_form['payment_cycle_'+selected_plan] = selected_cycle;
                    }
                    else{
                        jQuery(setupForm).find('.arm_payment_cycle_box_' + selected_plan).find(".arm_module_cycle_input:radio").filter('[value="' + selected_cycle + '"]').trigger('change');
                    }

            	}
            }
            else
            {
                jQuery(setupForm).find('.arm_setup_paymentcyclebox_wrapper').slideUp('slow').addClass('arm_hide');
            }

            if (payment_mode == 'both' && plan_type == 'recurring') {
                jQuery(setupForm).find('input:radio[name="arm_selected_payment_mode"]').filter('[value="auto_debit_subscription"]').attr('checked', 'checked').trigger('change');
                jQuery(setupForm).find('.arm_payment_mode_wrapper').show();
            } else {
                jQuery(setupForm).find('input:radio[name="arm_selected_payment_mode"]').filter('[value="' + payment_mode + '"]').attr('checked', 'checked').trigger('change');
                jQuery(setupForm).find('.arm_payment_mode_wrapper').hide();
            }

            jQuery(setupForm).find('.arm_setup_couponbox_wrapper').show('slow');


        }

        jQuery(setupForm).find('.arm_setup_gatewaybox_wrapper').show('slow');
    }
    armUpdateOrderAmount(setupForm, 0);
    if (gateway_skin == 'radio')
    {

        var gateway1 = jQuery(setupForm).find(".arm_module_gateway_input:radio:first").val();
        var scope = angular.element('[data-ng-controller=ARMCtrl]').scope();

        scope.arm_form.payment_gateway = gateway1;
       
        jQuery(setupForm).find(".arm_module_gateway_input:radio:first").trigger('change');
    }
    armResetCouponCode(setupForm);
}

function armSetupHideShowSections1(setupForm, planInput) {
    var gateway_skin = jQuery(setupForm).find('#arm_front_gateway_skin_type').val();
    var plan_skin = jQuery(setupForm).find('#arm_front_plan_skin_type').val();
    var selected_plan = planInput.attr('value');

    var total_cycle = planInput.attr('data-cycle');
    var user_selected_payment_mode = jQuery(setupForm).find('#arm_user_selected_payment_mode_' + selected_plan).val();
    var user_old_plan_array = jQuery(setupForm).find('#arm_user_old_plan').val();
    
    if(user_old_plan_array == undefined){

    var user_old_plan = [];
        
    }
    else{
    if(user_old_plan_array.search( ',' )){
        var user_old_plan = user_old_plan_array.split(',');
    }
    else{
        var user_old_plan = [];
    }
    }
    var plan_type = planInput.attr('data-type');
    var user_old_plan_cycle = jQuery(setupForm).find('#arm_user_old_plan_total_cycle_' + selected_plan).val();
    var user_old_plan_done_payment = jQuery(setupForm).find('#arm_user_done_payment_' + selected_plan).val();
    var user_selected_payment_cycle = jQuery(setupForm).find('#arm_user_selected_payment_cycle_' + selected_plan).val();
    var user_last_payment_status = jQuery(setupForm).find('#arm_user_last_payment_status_'+ selected_plan).val();

    if (gateway_skin == 'radio')
    {
        var selected_gateway_obj = jQuery(setupForm).find('.arm_module_gateway_input:checked');
        var selected_gateway = jQuery(setupForm).find('.arm_module_gateway_input:checked').val();
    }
    else
    {
        var container = jQuery(setupForm).find('.arm_module_gateway_input').attr('aria-owns');
        var selected_gateway_obj = jQuery('#'+container).find('md-option:selected');
        var selected_gateway = jQuery('#'+container).find('md-option:selected').attr('value');
    }
    var payment_mode = selected_gateway_obj.attr('data-payment_mode');

    jQuery(setupForm).find('input[name="arm_plan_type"]').val(plan_type).trigger('change');

    if (plan_type == 'free') {
       
        jQuery(setupForm).find('.arm_setup_gatewaybox_wrapper').hide('slow');
        jQuery(setupForm).find('.arm_payment_mode_wrapper').hide('slow');
       
        jQuery(setupForm).find('.arm_setup_paymentcyclebox_wrapper').slideUp('slow').addClass('arm_hide');
    } else {

        if (plan_type == 'recurring' && jQuery.inArray(selected_plan, user_old_plan) != -1 && (user_old_plan_cycle != user_old_plan_done_payment || user_old_plan_cycle == 'infinite') && user_selected_payment_mode == 'manual_subscription')
        {
            jQuery(setupForm).find('.arm_payment_mode_wrapper').hide();
            jQuery(setupForm).find('.arm_setup_couponbox_wrapper').hide('slow');

            if(plan_skin =='skin5'){
                var scope = angular.element('[data-ng-controller=ARMCtrl]').scope();
                scope.arm_form['payment_cycle_'+selected_plan] = user_selected_payment_cycle;
            }
            else{
                jQuery(setupForm).find('input:radio[name="payment_cycle_' + selected_plan + '"]').filter('[value="' + user_selected_payment_cycle + '"]').attr('checked', 'checked').trigger('change');
            }
            
            jQuery(setupForm).find('.arm_setup_paymentcyclebox_wrapper').slideUp('slow').addClass('arm_hide');
        }
        else
        {
            if (plan_type == 'recurring') {
            	if(user_last_payment_status == 'failed'){
            		jQuery(setupForm).find('.arm_payment_mode_wrapper').hide();
		            jQuery(setupForm).find('.arm_setup_couponbox_wrapper').hide('slow');
                    if(plan_skin =='skin5'){
                        var scope = angular.element('[data-ng-controller=ARMCtrl]').scope();
                        scope.arm_form['payment_cycle_'+selected_plan] = user_selected_payment_cycle;
                    }
                    else{
                        jQuery(setupForm).find('input:radio[name="payment_cycle_' + selected_plan + '"]').filter('[value="' + user_selected_payment_cycle + '"]').attr('checked', 'checked').trigger('change');
                    }
		            jQuery(setupForm).find('.arm_setup_paymentcyclebox_wrapper').slideUp('slow').addClass('arm_hide');
            	}
            	else{

            		jQuery(setupForm).find('.arm_module_payment_cycle_container').not('.arm_payment_cycle_box_' + selected_plan).slideUp('slow').addClass('arm_hide');
	                jQuery(setupForm).find('.arm_payment_cycle_box_' + selected_plan).slideDown('slow').removeClass('arm_hide');
	                if(total_cycle> 1){
	                	jQuery(setupForm).find('.arm_setup_paymentcyclebox_wrapper').slideDown('slow').removeClass('arm_hide');
	                    jQuery(setupForm).find('.arm_setup_payment_cycle_title_wrapper').slideDown('slow').removeClass('arm_hide');
	                }
	                else{
	                    jQuery(setupForm).find('.arm_setup_paymentcyclebox_wrapper').slideUp('slow').addClass('arm_hide');
	                    jQuery(setupForm).find('.arm_setup_payment_cycle_title_wrapper').slideUp('slow').addClass('arm_hide');
	                }

                    var selected_cycle = jQuery(setupForm).find('#arm_payment_cycle_plan_' + selected_plan).val();
                    if(plan_skin == 'skin5'){
                        var scope = angular.element('[data-ng-controller=ARMCtrl]').scope();
                         scope.arm_form['payment_cycle_'+selected_plan] = selected_cycle;
                    }
                    else{
                        jQuery(setupForm).find('.arm_payment_cycle_box_' + selected_plan).find(".arm_module_cycle_input:radio:[value="+selected_cycle+"]").trigger('change');
                    }

                    
	                
            	}
            }
            else
            {
                jQuery(setupForm).find('.arm_setup_paymentcyclebox_wrapper').slideUp('slow').addClass('arm_hide');
            }

            if (payment_mode == 'both' && plan_type == 'recurring') {
                
                jQuery(setupForm).find('input:radio[name="arm_selected_payment_mode"]').filter('[value="auto_debit_subscription"]').attr('checked', 'checked').trigger('change');
                
                jQuery(setupForm).find('.arm_payment_mode_wrapper').show();
            } else {
                
                jQuery(setupForm).find('input:radio[name="arm_selected_payment_mode"]').filter('[value="' + payment_mode + '"]').attr('checked', 'checked').trigger('change');
                
                jQuery(setupForm).find('.arm_payment_mode_wrapper').hide();
            }

            jQuery(setupForm).find('.arm_setup_couponbox_wrapper').show('slow');


        }
        jQuery(setupForm).find('.arm_setup_gatewaybox_wrapper').show('slow');
        
        
    }

    armUpdateOrderAmount1(planInput, setupForm, 0);
    if (gateway_skin == 'radio')
    {
        var gateway1 = jQuery(setupForm).find(".arm_module_gateway_input:radio:first").val();
        var scope = angular.element('[data-ng-controller=ARMCtrl]').scope();
        scope.arm_form.payment_gateway = gateway1;
        jQuery(setupForm).find(".arm_module_gateway_input:radio:first").trigger('change');
    }
    armResetCouponCode(setupForm);
}
function armUpdateOrderAmount(setupForm, discount, total)
{

    var scope = angular.element('[data-ng-controller=ARMCtrl]').scope();
    var selectedPlanSkin = jQuery(setupForm).find('#arm_front_plan_skin_type').val();

    if (selectedPlanSkin == 'skin5') {
       
        
        var arm_form_id = setupForm.attr('id');
        var arm_container = jQuery('#'+arm_form_id+' .arm_module_plan_input').attr('aria-owns');
        var planInput = jQuery('#'+arm_container).find('md-option[selected="selected"]');
        
    }
    else
    {
        var planInput = jQuery(setupForm).find('input.arm_module_plan_input:checked');
    }



    var currency = jQuery(setupForm).find('.arm_global_currency').val();
    currency = (currency == 'undefined') ? '' : currency;
    jQuery(setupForm).find('.arm_order_currency').text(currency);
    var plan_name = planInput.attr('data-plan_name');
    var plan_amt = planInput.attr('data-amt');
    jQuery(setupForm).find('.arm_plan_name_text').text(plan_name);
    jQuery(setupForm).find('.arm_plan_amount_text').text(plan_amt);
    var is_trial = planInput.attr('data-is_trial');

    var user_old_plan = jQuery(setupForm).find('#arm_user_old_plan').val();
    if (user_old_plan != 0 && user_old_plan != '')
    {
        is_trial = '0';
    }

    var trial_amt = planInput.attr('data-trial_amt');
    if (typeof trial_amt == typeof undefined || trial_amt == '')
    {
        trial_amt = '0.00';
    }
    if (is_trial != undefined && is_trial == '1') {
        trial_amt = planInput.attr('data-trial_amt');
        plan_amt = trial_amt;
    }
    jQuery(setupForm).find('.arm_trial_amount_text').text(trial_amt);
    if (total == '' || total == undefined) {
        total = plan_amt;
    }
    if (discount == 0 || discount == undefined) {
        total = plan_amt;
    }

    discount = (discount == 0 || discount == '' || discount == undefined) ? jQuery('#arm_zero_amount_discount').val() : '-' + discount;

    var arm_selected_payment_mode = '';
    if (planInput.attr('data-recurring') == 'subscription') {
        arm_selected_payment_mode = jQuery(setupForm).find('[name=arm_selected_payment_mode]:checked').val();
    }

  
    if (total <= 0 && arm_selected_payment_mode != 'auto_debit_subscription')
    {
        jQuery(setupForm).find('.arm_module_gateway_fields').slideUp('slow').addClass('arm_hide');
    }


    jQuery(setupForm).find('.arm_discount_amount_text').text(discount);
    jQuery(setupForm).find('.arm_payable_amount_text').text(total);
    jQuery(setupForm).find('#arm_total_payable_amount').val(total);
}

function armUpdateOrderAmount1(planInput, setupForm, discount, total)
{
    var planInput = planInput;

    var currency = jQuery(setupForm).find('.arm_global_currency').val();
    currency = (currency == 'undefined') ? '' : currency;
    jQuery(setupForm).find('.arm_order_currency').text(currency);
    var plan_name = planInput.attr('data-plan_name');
    var plan_amt = planInput.attr('data-amt');

    jQuery(setupForm).find('.arm_plan_name_text').text(plan_name);
    jQuery(setupForm).find('.arm_plan_amount_text').text(plan_amt);
    var is_trial = planInput.attr('data-is_trial');
    var trial_amt = planInput.attr('data-trial_amt');

    if (typeof trial_amt == typeof undefined || trial_amt == '')
    {
        trial_amt = '0.00';
    }

    var user_old_plan = jQuery(setupForm).find('#arm_user_old_plan').val();
    if (user_old_plan != 0 && user_old_plan != '')
    {
        is_trial = '0';
    }

    if (is_trial != undefined && is_trial == '1') {
        trial_amt = planInput.attr('data-trial_amt');
        plan_amt = trial_amt;
    }
    jQuery(setupForm).find('.arm_trial_amount_text').text(trial_amt);
    if (total == '' || total == undefined) {
        total = plan_amt;
    }
    if (discount == 0 || discount == undefined) {
        total = plan_amt;
    }
    discount = (discount == 0 || discount == '' || discount == undefined) ? jQuery('#arm_zero_amount_discount').val() : '-' + discount;

    var arm_selected_payment_mode = '';
    if (planInput.attr('data-recurring') == 'subscription') {
        var arm_selected_payment_mode = jQuery(setupForm).find('[name=arm_selected_payment_mode]:checked').val();
    }

    if (total <= 0 && arm_selected_payment_mode != 'auto_debit_subscription')
    {
        jQuery(setupForm).find('.arm_module_gateway_fields').hide('slow');
    }
   

    jQuery(setupForm).find('.arm_discount_amount_text').text(discount);
    jQuery(setupForm).find('.arm_payable_amount_text').text(total);
    jQuery(setupForm).find('#arm_total_payable_amount').val(total);
}
function armAnimateCounter(section)
{
    var number = jQuery(section).text();
    var originalNumber = number;
    if (typeof number == 'string') {
        number = number.replace(/,/g, '');
        number = parseFloat(number);
        number = number.toFixed(2);
    }
    jQuery(section).prop('Counter', 0).animate({
        Counter: number
    }, {
        duration: 500,
        easing: 'swing',
        step: function (now) {
            jQuery(section).text(now.toFixed(2));
        },
        complete: function () {
            jQuery(section).text(number);
            setTimeout(function () {
                jQuery(section).text(originalNumber);
            }, 1);
        },
    });
}



function arm_tooltip_init() {
    if (jQuery.isFunction(jQuery().tipso))
    {
        jQuery('.armhelptip').each(function () {
            jQuery(this).tipso({
                position: 'top',
                size: 'small',
                background: '#939393',
                color: '#ffffff',
                width: false,
                maxWidth: 400,
                useTitle: true
            });
        });
        jQuery('.arm_helptip_icon').each(function () {
            jQuery(this).tipso({
                position: 'top',
                size: 'small',
                tooltipHover: true,
                background: '#939393',
                color: '#ffffff',
                width: false,
                maxWidth: 400,
                useTitle: true
            });
        });
        jQuery('.arm_helptip_icon_ui').each(function () {
            if (jQuery.isFunction(jQuery().tooltip)) {
                jQuery(this).tooltip({
                    tooltipClass: 'arm_helptip_ui_content',
                    position: {
                        my: "center bottom-20",
                        at: "center top",
                        using: function (position, feedback) {
                            jQuery(this).css(position);
                            jQuery("<div>").addClass("arm_arrow").addClass(feedback.vertical).addClass(feedback.horizontal).appendTo(this);
                        }
                    },
                    content: function () {
                        return jQuery(this).prop('title');
                    },
                    show: {
                        duration: 0
                    },
                    hide: {
                        duration: 0
                    }
                });
            }
        });
        jQuery('.arm_email_helptip_icon').each(function () {
            jQuery(this).tipso({
                position: 'left',
                size: 'small',
                tooltipHover: true,
                background: '#939393',
                color: '#ffffff',
                width: false,
                maxWidth: 400,
                useTitle: true
            });
        });
        jQuery('.armhelptip_front').each(function () {
            jQuery(this).tipso({
                position: 'top',
                size: 'small',
                background: '#939393',
                color: '#ffffff',
                width: false,
                maxWidth: 400,
                useTitle: true
            });
        });
    }
}
function arm_transaction_init() {
    jQuery('.arm_transaction_list_header th.arm_sortable_th').each(function () {
        var transaction_list_tbl = jQuery(this).parents('.arm_user_transaction_list_table');
        var th = jQuery(this);
        var thIndex = th.index();
        var inverse = false;
        th.click(function () {
            transaction_list_tbl.find('th').removeClass('armAsc').removeClass('armDesc');
            transaction_list_tbl.find('td').filter(function () {
                return jQuery(this).index() === thIndex;
            }).armSortElements(function (a, b) {
                return jQuery.text([a]) > jQuery.text([b]) ? inverse ? -1 : 1 : inverse ? 1 : -1;
            }, function () {
                return this.parentNode;
            });
            var sortClass = inverse ? 'armDesc' : 'armAsc';
            jQuery(this).addClass(sortClass);
            inverse = !inverse;
        });
    });
}

function arm_current_membership_init() {
    jQuery('.arm_current_membership_list_header th.arm_sortable_th').each(function () {
        var transaction_list_tbl = jQuery(this).parents('.arm_user_current_membership_list_table');
        var th = jQuery(this);
        var thIndex = th.index();
        var inverse = false;
        th.click(function () {
            transaction_list_tbl.find('th').removeClass('armAsc').removeClass('armDesc');
            transaction_list_tbl.find('td').filter(function () {
                return jQuery(this).index() === thIndex;
            }).armSortElements(function (a, b) {
                return jQuery.text([a]) > jQuery.text([b]) ? inverse ? -1 : 1 : inverse ? 1 : -1;
            }, function () {
                return this.parentNode;
            });
            var sortClass = inverse ? 'armDesc' : 'armAsc';
            jQuery(this).addClass(sortClass);
            inverse = !inverse;
        });
    });
}



jQuery(document).on('click', '.arm_paging_wrapper_transaction .arm_page_numbers', function () {

    var transForm = jQuery(this).closest('form');

    var pageNum = jQuery(this).attr('data-page');
    if (!jQuery(this).hasClass('current')) {
        var formData = transForm.serialize();
        jQuery.ajax({
            type: "POST",
            url: __ARMAJAXURL,
            data: 'action=arm_transaction_paging_action&current_page=' + pageNum + '&' + formData,
            beforeSend: function () {

                transForm.find('.arm_transactions_wrapper').css('opacity', '0.5');
            },
            success: function (res) {
                transForm.find('.arm_transactions_wrapper').css('opacity', '1');
                transForm.parents('.arm_transactions_container').replaceWith(res);
                arm_transaction_init();
                return false;
            }
        });
    }
    return false;
});


jQuery(document).on('click', '.arm_login_history_form_container .arm_page_numbers', function () {
    var transForm = jQuery('.arm_login_history_form_container');
    var pageNum = jQuery(this).attr('data-page');
    var label = jQuery('.arm_login_history_field_label').val();
    var value = jQuery('.arm_login_history_field_value').val();
    if (!jQuery(this).hasClass('current')) {
        var formData = transForm.serialize();
        jQuery.ajax({
            type: "POST",
            url: __ARMAJAXURL,
            data: 'action=arm_login_history_paging_action&current_page=' + pageNum + '&label=' + label + '&value=' + value,
            beforeSend: function () {
                transForm.find('.arm_login_history_wrapper').css('opacity', '0.5');
            },
            success: function (res) {
                transForm.find('.arm_login_history_wrapper').css('opacity', '1');
                transForm.parents('.arm_login_history_container').replaceWith(res);

                return false;
            }
        });
    }
    return false;
});
jQuery(document).on('click', '.arm_membership_history_wrapper .arm_page_numbers', function () {
    var historyWrapper = jQuery(this).parents('.arm_membership_history_wrapper');
    var user_id = historyWrapper.attr('data-user_id');
    var pageNum = jQuery(this).attr('data-page');
    var per_page = jQuery(this).attr('data-per_page');
    if (!jQuery(this).hasClass('current') && !jQuery(this).hasClass('dots')) {
        jQuery.ajax({
            type: "POST",
            url: __ARMAJAXURL,
            data: "action=arm_membership_history_paging_action&user_id=" + user_id + "&page=" + pageNum + "&per_page=" + per_page,
            beforeSend: function () {
                historyWrapper.css('opacity', '0.4');
            },
            success: function (res) {
                historyWrapper.css('opacity', '1');
                historyWrapper.replaceWith(res);
                arm_tooltip_init();
                return false;
            }
        });
    }
    return false;
});

jQuery(document).on('click', '.arm_user_transaction_wrapper .arm_page_numbers', function () {
    var historyWrapper = jQuery(this).parents('.arm_user_transaction_wrapper');
    var user_id = historyWrapper.attr('data-user_id');
    var pageNum = jQuery(this).attr('data-page');
    var per_page = jQuery(this).attr('data-per_page');
    if (!jQuery(this).hasClass('current') && !jQuery(this).hasClass('dots')) {
        jQuery.ajax({
            type: "POST",
            url: __ARMAJAXURL,
            data: "action=arm_get_user_transactions_paging_action&user_id=" + user_id + "&page=" + pageNum + "&per_page=" + per_page,
            beforeSend: function () {
                historyWrapper.css('opacity', '0.4');
            },
            success: function (res) {
                historyWrapper.css('opacity', '1');
                historyWrapper.replaceWith(res);
                arm_tooltip_init();
                return false;
            }
        });
    }
    return false;
});

jQuery(document).on('click', '.arm_loginhistory_wrapper .arm_page_numbers', function () {
    var historyWrapper = jQuery(this).parents('.arm_loginhistory_wrapper');
    var user_id = historyWrapper.attr('data-user_id');
    var pageNum = jQuery(this).attr('data-page');
    var per_page = jQuery(this).attr('data-per_page');
    if (!jQuery(this).hasClass('current') && !jQuery(this).hasClass('dots')) {
        jQuery.ajax({
            type: "POST",
            url: __ARMAJAXURL,
            data: "action=arm_user_login_history_paging_action&user_id=" + user_id + "&page=" + pageNum + "&per_page=" + per_page,
            beforeSend: function () {
                historyWrapper.css('opacity', '0.4');
            },
            success: function (res) {
                historyWrapper.css('opacity', '1');
                historyWrapper.replaceWith(res);
                arm_tooltip_init();
                return false;
            }
        });
    }
    return false;
});

jQuery(document).on('click', '.arm_all_loginhistory_wrapper .arm_page_numbers', function () {
    var historyWrapper = jQuery(this).parents('.arm_all_loginhistory_wrapper');

    var pageNum = jQuery(this).attr('data-page');
    var per_page = jQuery(this).attr('data-per_page');
    if (!jQuery(this).hasClass('current') && !jQuery(this).hasClass('dots')) {
        jQuery.ajax({
            type: "POST",
            url: __ARMAJAXURL,
            data: "action=arm_all_user_login_history_paging_action&page=" + pageNum + "&per_page=" + per_page,
            beforeSend: function () {
                historyWrapper.css('opacity', '0.4');
            },
            success: function (res) {
                historyWrapper.css('opacity', '1');
                historyWrapper.replaceWith(res);
                arm_tooltip_init();
                return false;
            }
        });
    }
    return false;
});

function arm_get_directory_list(dirForm)
{
    if (typeof dirForm != 'undefined') {
        var tempID = dirForm.attr('data-temp');
        var formData = dirForm.serialize();
        dirForm.find('#arm_loader_img').show();
        jQuery.ajax({
            type: "POST",
            url: __ARMAJAXURL,
            data: 'action=arm_directory_paging_action&' + formData,
            beforeSend: function () {
                dirForm.find('.arm_template_container').css('opacity', '0.5');
            },
            success: function (res) {
                dirForm.find('.arm_template_container').css('opacity', '1');
                dirForm.find('#arm_loader_img').hide();
                var pagination = jQuery('.arm_template_wrapper_' + tempID).find('.arm_temp_field_pagination').val();
                if (pagination == 'infinite') {
                    jQuery('.arm_template_wrapper_' + tempID).find('.arm_user_block, .arm_directory_paging_container').remove();
                    jQuery('.arm_template_wrapper_' + tempID).find('.arm_template_container').prepend(res);
                } else {
                    jQuery('.arm_template_wrapper_' + tempID).replaceWith(res);
                    if (jQuery('.arm_template_wrapper_' + tempID).parents('.arm_template_preview_popup').length == 0) {
                        jQuery(window.opera ? 'html' : 'html, body').animate({scrollTop: jQuery('.arm_template_wrapper_' + tempID).offset().top - 10}, 1000);
                    }
                }
                arm_tooltip_init();
                setTimeout(function () {
                    armAdjustDirectoryTemplateBox();
                }, 100);
                return false;
            }
        });
    }
    return false;
}
jQuery(document).on('change', '.arm_directory_listof_input', function () {
    jQuery(this).parents('.arm_directory_list_of_filters').find('label').removeClass('arm_active');
    jQuery(this).parent('label').addClass('arm_active');
    var dirForm = jQuery(this).parents('.arm_directory_form_container');
    arm_get_directory_list(dirForm);
});
jQuery(document).on('change', '.arm_directory_listby_select', function () {
    var listby = jQuery(this);
    var dirForm = jQuery(this).parents('.arm_directory_form_container');
    arm_get_directory_list(dirForm);
});
jQuery(document).on('click', '.arm_directory_search_btn', function () {
    var search = jQuery('.arm_directory_search_box').val();

    var dirForm = jQuery(this).parents('.arm_directory_form_container');
    arm_get_directory_list(dirForm);
});
jQuery(document).on('click', '.arm_directory_form_container .arm_directory_load_more_btn', function () {
    var dirForm = jQuery(this).parents('.arm_directory_form_container');
    jQuery(this).hide();
    dirForm.find('.arm_directory_paging_container .arm_load_more_loader').show();
    var tempID = dirForm.attr('data-temp');
    var pageNum = jQuery(this).attr('data-page');
    var formData = dirForm.serialize();

    jQuery.ajax({
        type: "POST",
        url: __ARMAJAXURL,
        data: 'action=arm_directory_paging_action&current_page=' + pageNum + '&' + formData,
        beforeSend: function () {

        },
        success: function (res) {

            jQuery('.arm_template_wrapper_' + tempID + ' .arm_directory_paging_container').replaceWith(res);
            arm_tooltip_init();
            setTimeout(function () {
                armAdjustDirectoryTemplateBox();
            }, 100);
            return false;
        }
    });
});
jQuery(document).on('click', '.arm_directory_form_container .arm_page_numbers', function () {
    var dirForm = jQuery(this).parents('.arm_directory_form_container');
    var tempID = dirForm.attr('data-temp');
    var pageNum = jQuery(this).attr('data-page');
    if (!jQuery(this).hasClass('current') && !jQuery(this).hasClass('dots')) {
        var formData = dirForm.serialize();
        dirForm.find('.arm_template_loading').show();
        jQuery.ajax({
            type: "POST",
            url: __ARMAJAXURL,
            data: 'action=arm_directory_paging_action&current_page=' + pageNum + '&' + formData,
            beforeSend: function () {
                dirForm.find('.arm_template_container').css('opacity', '0.5');
            },
            success: function (res) {
                dirForm.find('.arm_template_container').css('opacity', '1');
                dirForm.find('.arm_template_loading').hide();
                jQuery('.arm_template_wrapper_' + tempID).replaceWith(res);
                if (jQuery('.arm_template_wrapper_' + tempID).parents('.arm_template_preview_popup').length == 0) {
                    jQuery(window.opera ? 'html' : 'html, body').animate({scrollTop: jQuery('.arm_template_wrapper_' + tempID).offset().top - 10}, 1000);
                }
                arm_tooltip_init();
                setTimeout(function () {
                    armAdjustDirectoryTemplateBox();
                }, 100);
                return false;
            }
        });
    }
    return false;
});
jQuery(document).on('click', '.arm_switch_label', function () {
    var value = jQuery(this).attr('data-value');
    jQuery(this).parent('.arm_switch').find('.arm_switch_radio').val(value);
    jQuery(this).parent('.arm_switch').find('.arm_switch_label').removeClass('active');
    jQuery(this).addClass('active');
});

jQuery(document).on('change', "input.arm_module_cycle_input", function (e) {
    jQuery(this).parents('.arm_module_payment_cycle_ul').find('.arm_setup_column_item').removeClass("arm_active");
    jQuery(this).parents('.arm_setup_column_item').addClass("arm_active");
    var setupForm = jQuery(this).parents('form:first');
    var scope = angular.element('[data-ng-controller=ARMCtrl]').scope();
    var plan_amt = jQuery(this).attr('data-plan_amount');
    var selectedPlanSkin = jQuery(setupForm).find('#arm_front_plan_skin_type').val();

    if (selectedPlanSkin == 'skin5') {
        
        var container = jQuery(setupForm).find('md-select[name="subscription_plan"]').attr('aria-owns');
        var planInput = jQuery('#'+container).find('md-option[selected="selected"]');
        
        planInput.find('.arm_module_plan_cycle_price').html(plan_amt);
        jQuery(setupForm).find('md-select[name="subscription_plan"]' ).find('.arm_module_plan_cycle_price').html(plan_amt);
    }
    else
    {
        var planInput = jQuery(setupForm).find('input.arm_module_plan_input:checked');
        planInput.parents('.arm_setup_column_item').find('.arm_module_plan_cycle_price').html(plan_amt);
    }
    planInput.attr('data-amt', plan_amt);
    armResetCouponCode(setupForm);
    armUpdateOrderAmount(setupForm);
    e.stopPropagation();



});

jQuery(document).on('change', "input.arm_module_gateway_input", function (e) {

    jQuery(this).parents('.arm_module_gateways_ul').find('.arm_setup_column_item').removeClass("arm_active");
    jQuery(this).parents('.arm_setup_column_item').addClass("arm_active");
    var gateway = jQuery(this).val();
    var form = jQuery(this).parents('form:first');


    var arm_form_id = form.attr('id');

    var arm_selected_payment_mode = jQuery(form).find('[name=arm_selected_payment_mode]:checked').val();
    var arm_total_payable_amount = jQuery(form).find('#arm_total_payable_amount').val();

    if (arm_total_payable_amount != '0.00' && arm_total_payable_amount != '0')
    {
        jQuery('#'+arm_form_id+' .arm_module_gateway_fields').not('.arm_module_gateway_fields_' + gateway).slideUp('slow').addClass('arm_hide');
        
       
        jQuery('#'+arm_form_id+' .arm_module_gateway_fields_' + gateway).slideDown('slow').removeClass('arm_hide');
    }
    else if ((arm_total_payable_amount == '0.00' || arm_total_payable_amount == '0') && arm_selected_payment_mode == 'auto_debit_subscription')
    {
        jQuery('#'+arm_form_id+' .arm_module_gateway_fields').not('.arm_module_gateway_fields_' + gateway).slideUp('slow').addClass('arm_hide');
       
        jQuery('#'+arm_form_id+' .arm_module_gateway_fields_' + gateway).slideDown('slow').removeClass('arm_hide');
    }

    else
    {
        jQuery('#'+arm_form_id+' .arm_module_gateway_fields').slideUp('slow').addClass('arm_hide');
    }

    var selectedPlanSkin = jQuery(form).find('#arm_front_plan_skin_type').val();
    var paymentMode = jQuery(this).attr('data-payment_mode');
    var scope = angular.element('[data-ng-controller=ARMCtrl]').scope();

    var user_old_plan_array = jQuery('#'+arm_form_id+' #arm_user_old_plan').val();
    var user_old_plan = user_old_plan_array.split(',');


    if (selectedPlanSkin == 'skin5') {


        var arm_container = jQuery('#'+arm_form_id+' .arm_module_plan_input').attr('aria-owns');

                        var plan_name_obj = jQuery('#'+arm_container).find('md-option[selected="selected"]');
        var SelectedPlan = plan_name_obj.attr('value');

        

        var user_selected_payment_mode = jQuery('#'+arm_form_id+' #arm_user_selected_payment_mode_' + SelectedPlan).val();
        var user_old_plan_cycle = jQuery('#'+arm_form_id+' #arm_user_old_plan_total_cycle_' + SelectedPlan).val();
        var user_old_plan_done_payment = jQuery('#'+arm_form_id+' #arm_user_done_payment_' + SelectedPlan).val();


        var container = jQuery('#'+arm_form_id+' md-select[name="subscription_plan"]').attr('aria-owns');
        var obj = jQuery('#'+container).find('md-option[value="' + SelectedPlan + '"]');
        var dataType = obj.attr('data-type');
        if (dataType == 'recurring' && jQuery.inArray(SelectedPlan, user_old_plan) != -1 && (user_old_plan_cycle != user_old_plan_done_payment || user_old_plan_cycle == 'infinite') && user_selected_payment_mode == 'manual_subscription')
        {

            jQuery('#'+arm_form_id+' .arm_payment_mode_wrapper').hide('slow');
            jQuery('#'+arm_form_id+' .arm_setup_couponbox_wrapper').hide('slow');
        }
        else
        {

            jQuery('#'+arm_form_id+' .arm_setup_couponbox_wrapper').show('slow');
            if (dataType == 'recurring' && paymentMode == 'both') {
                
                jQuery('#'+arm_form_id+' input:radio[name="arm_selected_payment_mode"]').filter('[value="auto_debit_subscription"]').attr('checked', 'checked').trigger('change');
                
                jQuery('#'+arm_form_id+' .arm_payment_mode_wrapper').show('slow');
            } else {
                
                
                jQuery('#'+arm_form_id+' input:radio[name="arm_selected_payment_mode"]').filter('[value="' + paymentMode + '"]').attr('checked', 'checked').trigger('change');
                jQuery('#'+arm_form_id+' .arm_payment_mode_wrapper').hide('slow');
            }
        }
        armUpdateOrderAmount1(obj, form, 0);
    } else {
        var selectedPlan = jQuery('#'+arm_form_id+' .arm_module_plan_input:checked');
        var user_selected_payment_mode = jQuery('#'+arm_form_id+' #arm_user_selected_payment_mode_' + selectedPlan.attr('value')).val();
        var user_old_plan_cycle = jQuery('#'+arm_form_id+' #arm_user_old_plan_total_cycle_' + selectedPlan.attr('value')).val();
        var user_old_plan_done_payment = jQuery('#'+arm_form_id+' #arm_user_done_payment_' + selectedPlan.attr('value')).val();
        var dataType = selectedPlan.attr('data-type');


        if (dataType == 'recurring' && jQuery.inArray(selectedPlan.attr('value'), user_old_plan) != -1 && (user_old_plan_cycle != user_old_plan_done_payment || user_old_plan_cycle == 'infinite') && user_selected_payment_mode == 'manual_subscription')
        {

            jQuery('#'+arm_form_id+' .arm_setup_couponbox_wrapper').hide('slow');
            jQuery('#'+arm_form_id+' .arm_payment_mode_wrapper').hide('slow');
        }
        else
        {

            jQuery('#'+arm_form_id+' .arm_setup_couponbox_wrapper').show('slow');
            if (dataType == 'recurring' && paymentMode == 'both') {

                
                jQuery('#'+arm_form_id+' input:radio[name="arm_selected_payment_mode"]').filter('[value="auto_debit_subscription"]').attr('checked', 'change').trigger('change');
                
                jQuery('#'+arm_form_id+' .arm_payment_mode_wrapper').show('slow');
            } else {

                
                jQuery('#'+arm_form_id+' input:radio[name="arm_selected_payment_mode"]').filter('[value="' + paymentMode + '"]').attr('checked', 'checked').trigger('change');
                
                jQuery('#'+arm_form_id+' .arm_payment_mode_wrapper').hide('slow');
            }
        }
        armUpdateOrderAmount(form, 0);
    }

    armResetCouponCode(form);
    e.stopPropagation();
});
function arm_hide_show_section(field, section) {
    if (section != '') {
        var field_type = jQuery(field).attr('type');
        if (field_type == 'checkbox') {
            if (jQuery(field).is(':checked')) {
                jQuery(section).show();
            } else {
                jQuery(section).hide();
            }
        }
    }
}
jQuery(document).on('click', '.arm_shortcode_form [type="submit"], .arm_shortcode_form [type="button"], .arm_membership_setup_form [type="submit"], .arm_membership_setup_form [type="button"]', function () {
    var e = jQuery.Event("keydown");
    e.which = 9;
    jQuery('body').trigger(e);
});
function arm_form_ajax_action(form) {

    var form_key = jQuery(form).attr('data-random-id');
    var filter_input = jQuery(form).find('input[name="arm_filter_input"]');

    jQuery(form).find('input[name="arm_filter_input"]').remove();

    jQuery(form).prepend('<input type="hidden" name="form_random_key" value="' + form_key + '" />');
    var form_data = jQuery(form).serialize();
    jQuery(form).find('input[name="form_random_key"]').remove();
    var url = window.location.href;

    if (url.indexOf("key") >= 0 && url.indexOf("login") >= 0 && url.indexOf("action") >= 0)
    {

        var path = url.split("?");
        var path1 = path[1].split("&");

        if (path1[0].match(/^(page_id)+.*$/)) {
            var action1 = path1[1].split("=");
            var key1 = path1[2].split("=");
            var login1 = path1[3].split("=");
        }
        else {
            var action1 = path1[0].split("=");
            var key1 = path1[1].split("=");
            var login1 = path1[2].split("=");
        }

        var action2 = action1[1];
        var key2 = key1[1];
        var login2 = login1[1];
        var data1 = 'action=arm_shortcode_form_ajax_action&' + form_data + '&action2=' + action2 + '&key2=' + key2 + '&login2=' + login2;

    }
    else
    {
        var data1 = 'action=arm_shortcode_form_ajax_action&' + form_data;
    }


    jQuery('.arm_form_message_container').html('');

    jQuery.ajax({
        type: "POST",
        url: __ARMAJAXURL,
        dataType: 'json',
        data: data1,
        beforeSend: function () {
            jQuery(form).find("input[type='submit'], button[type='submit']").attr('disabled', 'disabled').addClass('active');
        },
        success: function (res) {
            

            if (res.status == 'success') {
                if (res.is_action == 'rp')
                {
                    jQuery(form).parent('.arm_member_form_container').find('.arm_form_message_container').html(res.message).show();
                    jQuery(form).parent('.arm_member_form_container').find('.arm_form_message_container1').hide();
                    jQuery(form).hide();
                }
                else
                {
                   
                    if(typeof res.script != 'undefined' && res.script !== ''){
                        jQuery('body').append(res.script);
                    }
                   
                    if (res.type != 'redirect') {
                        jQuery(form).parent('.arm_member_form_container').find('.arm_form_message_container').html(res.message).show().delay(5000).fadeOut(2000);
                    }
                    else{
                        window.location.href= res.message;
                    }
                    
                }
                if (!jQuery(form).hasClass('arm_form_edit_profile')) {
                    
                    if (typeof armResetFileUploader == "function") {
                        armResetFileUploader(form);
                    }
                    
                }

                if (!jQuery(form).hasClass('arm_form_edit_profile') && res.type != 'redirect') {
                    jQuery(form).trigger("reset");
                }

                if (res.type != 'redirect') {
                    arm_reinit_session_var(form, __ARMAJAXURL, form_key);
                }
            } else {
                jQuery(form).parent('.arm_member_form_container').find('.arm_form_message_container').html(res.message).show().delay(5000).fadeOut(2000);
                jQuery(form).parent('.arm_member_form_container').find('.arm_form_message_container i.armfa-times').click(function () {
                    jQuery(form).parent('.arm_member_form_container').find('.arm_form_message_container .arm_error_msg').delay(100).fadeOut(2000);
                });
                arm_reinit_session_var(form, __ARMAJAXURL, form_key);
            }
            if (res.type != 'redirect') {
              
                jQuery(window.opera ? 'html' : 'html, body').animate({scrollTop: jQuery(form).parent('.arm_member_form_container').find('.arm_form_message_container').offset().top - 50}, 1000);
                jQuery(form).parent('.arm_member_form_container').find('.arm_form_message_container').html(res.message).show().delay(5000).fadeOut(2000);
            }
            jQuery(form).find("input[type='submit'], button[type='submit']").removeAttr('disabled').removeClass('active');
        }
    });
}
function arm_setup_form_ajax_action(form) {
    var form_key = jQuery(form).attr('data-random-id');
    var filter_input = jQuery(form).find('input[name="arm_filter_input"]');

    jQuery(form).find('input[name="arm_filter_input"]').remove();

    jQuery(form).prepend('<input type="hidden" name="form_random_key" value="' + form_key + '" />');
    var $formContainer = jQuery(form).parents('.arm_setup_form_container');
    var form_data = jQuery(form).serialize();
    jQuery(form).find('input[name="form_random_key"]').remove();
    jQuery('.arm_setup_messages').html('');
    jQuery.ajax({
        type: "POST",
        url: __ARMAJAXURL,
        dataType: 'json',
        data: 'action=arm_membership_setup_form_ajax_action&' + form_data,
        beforeSend: function () {
            jQuery(form).find("input[type='submit'], button[type='submit']").attr('disabled', 'disabled').addClass('active');
        },
        success: function (res) {
            jQuery(form).find("input[type='submit'], button[type='submit']").removeAttr('disabled').removeClass('active');
            var message = res.message;
            if (res.status == 'success') {

                
                if(typeof res.script != 'undefined' && res.script !== ''){
                    
                    jQuery('body').append(res.script);
                }




                $formContainer.find('.arm_setup_messages').html(message).show().delay(5000).fadeOut(2000);
                if (res.type != 'redirect') {
                    if (typeof armResetFileUploader == "function") {
                        armResetFileUploader(form);
                    }
                    
                    jQuery(form).find('.arm_module_gateway_input').trigger("change");
                    jQuery(form).find('.arm_module_plan_input').trigger("change");
                }
                if (res.type != 'redirect') {
                    jQuery(form).trigger("reset");
                    arm_reinit_session_var(form, __ARMAJAXURL, form_key);
                }
            } else {
                $formContainer.find('.arm_setup_messages').html(message).show();
                arm_reinit_session_var(form, __ARMAJAXURL, form_key)
            }

            if (res.type != 'redirect') {
                
                jQuery(window.opera ? 'html' : 'html, body').animate({scrollTop: $formContainer.find('.arm_setup_messages').offset().top - 50}, 1000);
                $formContainer.find('.arm_setup_messages').html(message).show().delay(5000).fadeOut(2000);
            }
        }
    });
}
function armResetFileUploader(form)
{
    jQuery(form).find('.armFileUploadWrapper').each(function () {
        var $ProgressBar = jQuery(this).find('.armFileUploadProgressBar');
        $ProgressBar.hide();
        $ProgressBar.find('.armbar').css('width', "0%");
        jQuery(this).find('.armFileUploadContainer').show();
        jQuery(this).find('.armFileRemoveContainer').hide();
        jQuery(this).find('.armFileUploadProgressInfo').html('');
        jQuery(this).find('input').val('');
        jQuery(this).find('.armFileMessages').html('');
        jQuery(this).find('.arm_old_file').remove();
    });
}
function validateStripePaymentBeforeSubmitForm(form) {
    var returnType = true;

    var gateway_skin = jQuery('#arm_front_gateway_skin_type').val();
    if (gateway_skin == 'radio')
    {
        var gateway_type = jQuery(form).find('input.arm_module_gateway_input:checked').val();
    }
    else
    {
        var gateway_type = jQuery(form).find('arm_module_gateway_input').val();
    }

    if (typeof Stripe != 'undefined' && jQuery.isFunction(Stripe)) {
        if (gateway_type == 'stripe') {
            jQuery(form).find('.arm_setup_submit_btn').addClass('active');
            var returnType = false;
            var payment_options = jQuery(form).find('.arm_module_gateway_fields_stripe');
            payment_options.find(".payment-errors").html('');
            var card_number = payment_options.find('.cardNumber').val();
            var cvc = payment_options.find('.cardCVC').val();
            var exp_month = payment_options.find('.card-expiry-month').val();
            var exp_year = payment_options.find('.card-expiry-year').val();
            var is_user_logged_in = jQuery(form).find('#arm_is_user_logged_in_flag').val();
            if(is_user_logged_in == 1){
                var name = jQuery(form).find('#arm_user_firstname_lastname').val();
            }
            else{
                var first_name = jQuery(form).find('input[name=first_name]').val();
                var last_name = jQuery(form).find('input[name=last_name]').val();
                var email = jQuery(form).find('input[name=user_email]').val();
                if(first_name != '' && last_name != ''){
                    var name = first_name+' '+last_name;
                }
                else{
                    var name = email;
                }

                
            }


            Stripe.createToken({
                number: card_number,
                cvc: cvc,
                exp_month: exp_month,
                exp_year: exp_year,
                name: name
            }, 100, function (status, response) {
                if (response.error) {
                    payment_options.find(".payment-errors").html(response.error.message);
                } else {
                    var token = response['id'];
                    var input = jQuery("<input name='stripeToken' value='" + token + "' type='hidden' />");
                    jQuery(input).appendTo(form);
                    returnType = true;
                }
            });
        }
    }
    return returnType;
}
function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}


jQuery(document).on('click', '.arm_cancel_membership_link', function () {
    var cancel_msg = confirm(confirmCancelSubscription);
    var plan_id = jQuery(this).attr('data-plan_id');
    var total_columns = jQuery('#arm_total_current_membership_columns').val();
    var cancel_message = jQuery('#arm_cancel_subscription_message').val();
    if (cancel_msg == true) {
        jQuery('.arm_form_message_container').html('');
        jQuery('#arm_cancel_subscription_link_' + plan_id).hide();
        jQuery('#arm_field_loader_img_' + plan_id).show();
        jQuery.ajax({
            type: "POST",
            url: __ARMAJAXURL,
            dataType: 'json',
            data: "action=arm_cancel_membership&type=front&plan_id=" + plan_id + "&cancel_message=" + cancel_message,
            success: function (response)
            {
                if (response.type == 'success')
                {
                    var content = '<td colspan="' + total_columns + '" class="arm_current_membership_cancelled_row">' + response.msg + '</td>';
                    jQuery('#arm_current_membership_tr_' + plan_id).html(content);
                    

                } else {
                   alert(errorPerformingAction);
                    jQuery('#arm_cancel_subscription_link_' + plan_id).show();
                }

            }
        });
    } else {
        return false;
    }
    return false;
});

jQuery(document).on('click', '.arm_cancel_membership_btn', function () {
    var cancel_msg = confirm(confirmCancelSubscription);
    var plan_id = jQuery(this).attr('data-plan_id');
    if (cancel_msg == true) {
        jQuery('.arm_form_message_container').html('');
        jQuery('.arm_cancel_membership_plan_' + plan_id).show();
        jQuery.ajax({
            type: "POST",
            url: __ARMAJAXURL,
            dataType: 'json',
            data: "action=arm_cancel_membership&type=front&plan_id=" + plan_id,
            success: function (response)
            {

                if (response.type == 'success')
                {
                    var msg = (response.msg != '') ? response.msg : userSubscriptionCancel;
                    var message = '<div class="arm_success_msg">' + msg + '</div>';
                    jQuery('.arm_cancel_membership_form_container').find('.arm_cancel_membership_message_container_' + plan_id).html(message).show().delay(10000);
                    jQuery(window.opera ? 'html' : 'html, body').animate({scrollTop: jQuery('.arm_cancel_membership_message_container_' + plan_id).offset().top - 50}, 1000);
                    jQuery('.arm_cancel_membership_button_link_' + plan_id).hide();
                } else {
                    var msg = (response.msg != '') ? response.msg : errorPerformingAction;
                    msg += '<i class="armfa armfa-times"></i>';
                    var message = '<div class="arm_error_msg">' + msg + '</div>';
                    jQuery('.arm_cancel_membership_form_container').find('.arm_cancel_membership_message_container_' + plan_id).html(message).show().delay(10000).fadeOut(2000);
                    jQuery(window.opera ? 'html' : 'html, body').animate({scrollTop: jQuery('.arm_cancel_membership_message_container_' + plan_id).offset().top - 50}, 1000);
                    jQuery('.arm_cancel_membership_form_container').find('.arm_cancel_membership_message_container_' + plan_id + ' i.armfa-times').click(function () {
                        jQuery('.arm_cancel_membership_form_container').find('.arm_cancel_membership_message_container_' + plan_id + ' .arm_error_msg').delay(100);
                    });
                }
                jQuery('.arm_cancel_membership_plan_' + plan_id).hide();
            }
        });
    } else {
        return false;
    }
    return false;
});
function FacebookInit(appId) {
    if (appId != '')
    {
        window.fbAsyncInit = function () {
            FB.init({
                appId: appId,
                status: true,
                cookie: true,
                xfbml: true,
                version: 'v2.4'
            });
        };
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
}
function FacebookLoginInit() {
    var arm_social_login_redirect_to = jQuery('#arm_social_login_redirect_to').val();
    var fbbtn = jQuery(this);
    var permissions = ['public_profile', 'email'].join(',');
    var fields = [
        'id', 'name', 'first_name', 'last_name', 'email',
        'gender', 'picture',
    ].join(',');
    if (typeof FB != 'undefined') {
        FB.login(function (response) {
            if (response.authResponse) {
                var uid = response.authResponse.userID;
                var accessToken = response.authResponse.accessToken;
                FB.api('/me', {fields: fields}, function (resApi) {

                    resApi.token = accessToken;
                    resApi.redirect_to = arm_social_login_redirect_to;

                    resApi.userId = uid;
                    jQuery('.arm_social_login_main_container').hide();
                    
                    jQuery('.arm_social_facebook_container').parent('.arm_social_login_main_container').next('.arm_social_connect_loader').show();
                    
                    FacebookLoginCallBack(resApi);
                });
            } else {

            }
        }, {scope: permissions});
    }
}
function FacebookLoginCallBack(resApi) {
    if (resApi.picture === undefined) {
        var user_data = {
            'action': 'arm_social_login_callback',
            'action_type': 'facebook',
            'id': resApi.id,
            'token': resApi.token,
            'user_email': resApi.email,
            'first_name': resApi.first_name,
            'last_name': resApi.last_name,
            'display_name': resApi.name,
            'birthday': resApi.birthday,
            'gender': resApi.gender,
            'picture': '',
            'redirect_to': resApi.redirect_to,
            'user_profile_picture': 'https://graph.facebook.com/' + resApi.userId + '/picture?type=normal',
            'userId': resApi.userId,
        };
    } else {
        var user_data = {
            'action': 'arm_social_login_callback',
            'action_type': 'facebook',
            'id': resApi.id,
            'token': resApi.token,
            'user_email': resApi.email,
            'first_name': resApi.first_name,
            'last_name': resApi.last_name,
            'display_name': resApi.name,
            'birthday': resApi.birthday,
            'gender': resApi.gender,
            'picture': resApi.picture.data.url,
            'redirect_to': resApi.redirect_to,
            'user_profile_picture': 'https://graph.facebook.com/' + resApi.userId + '/picture?type=normal',
            'userId': resApi.userId,
        };
    }

    jQuery.ajax({
        type: "POST",
        url: __ARMAJAXURL,
        dataType: 'json',
        data: user_data,
        success: function (res) {
            if (res.type == 'redirect')
            {
                location.href = res.message;
                return false;
            } else {
                if (res.status != 'success') {
                    alert(res.message);
                }
            }
            jQuery('.arm_social_connect_loader').hide();
            return false;
        }
    });
    return false;
}
jQuery(document).on('click', '.arm_social_link_twitter', function (e) {
    e.preventDefault();
    twitter_auth = window.open(jQuery(this).attr("data-url"), "popupWindow", "width=700,height=400,scrollbars=yes");
    var interval = setInterval(function () {
        if (twitter_auth.closed) {
            clearInterval(interval);
            return;
        }
    }, 500);
});

function LinkedInLoginInit() {
    if (typeof IN != 'undefined') {
        IN.UI.Authorize().place();
        IN.Event.on(IN, "auth", function () {
            jQuery('.arm_social_login_main_container').fadeOut();
            
            jQuery('.arm_social_linkedin_container').parent('.arm_social_login_main_container').next('.arm_social_connect_loader').show();
            IN.API.Profile("me").fields("id", "firstName", "lastName", "email-address", "picture-urls::(original)", "public-profile-url", "headline").result(LinkedInLoginCallBack);
        });
    }
}

function LinkedInLoginCallBack(profiles) {
    var member = profiles.values[0];
    var arm_social_login_redirect_to = jQuery('#arm_social_login_redirect_to').val();
    var i = jQuery("#arm_social_login_form_id").val();
    var user_data = {
        'action': 'arm_social_login_callback',
        'action_type': 'linkedin',
        'id': member.id,
        'user_email': member.emailAddress,
        'first_name': member.firstName,
        'last_name': member.lastName,
        'display_name': member.firstName + member.lastName,
        'picture': member.pictureUrls["values"][0],
        'redirect_to': arm_social_login_redirect_to,
        'social_login_form_id': i,
        'user_profile_picture': member.pictureUrls["values"][0],
        'arm_social_field_linkedin': member.publicProfileUrl,
    };
    jQuery.ajax({
        type: "POST",
        url: __ARMAJAXURL,
        dataType: 'json',
        data: user_data,
        success: function (res) {
            if (res.type == 'redirect')
            {
                var redirURL = res.message;
                if (window.location.pathname == '/arm_register/'){
                    redirURL = redirURL.replace("treble-victor-group-member-application-form", "arm_register");
                }
                location.href = redirURL + '#registration_form';                
                return false;
            } else {
                if (res.status != 'success') {
                    alert(res.message);
                }
            }
            jQuery('.arm_social_connect_loader').hide();
            return false;
        }
    });
    return false;
}
function GoogleHandleAuthResult(authResult) {

    var authorizeButton = document.getElementById('authorize-button');
    if (authResult && !authResult.error) {
        GoogleLoginCallBack();
    } else {
        authorizeButton.style.visibility = '';
        authorizeButton.onclick = GoogleHandleAuthClick;
    }
}
function GoogleLoginCallBack() {
    if (typeof gapi != 'undefined') {
        gapi.client.load('plus', 'v1').then(function () {
            jQuery('.arm_social_login_main_container').hide();
            
            jQuery('.arm_social_googleplush_container').parent('.arm_social_login_main_container').next('.arm_social_connect_loader').show();
            var request = gapi.client.plus.people.get({
                'userId': 'me'
            });
            request.then(function (resp) {
                var response = resp.result;
                var arm_social_login_redirect_to = jQuery('#arm_social_login_redirect_to').val();
                var profile_pic = response.image.url;
                if (response.image.isDefault) {
                    profile_pic = '';
                }
                var user_data = {
                    'action': 'arm_social_login_callback',
                    'action_type': 'googleplush',
                    'id': response.id,
                    'user_email': response.emails[0].value,
                    'first_name': response.name.givenName,
                    'last_name': response.name.familyName,
                    'display_name': response.displayName,
                    'gender': response.gender,
                    'picture': profile_pic,
                    'user_profile_picture': profile_pic,
                    'redirect_to': arm_social_login_redirect_to,
                    'userId': response.id,
                };
                jQuery.ajax({
                    type: "POST",
                    url: __ARMAJAXURL,
                    dataType: 'json',
                    data: user_data,
                    success: function (res)
                    {
                        if (res.type == 'redirect')
                        {
                            location.href = res.message;
                            return false;
                        } else {
                            if (res.status != 'success') {
                                alert(res.message);
                            }
                        }
                        jQuery('.arm_social_connect_loader').hide();
                        return false;
                    }
                });
            }, function (reason) {
            });
        });
    }
    return false;
}
function PinterestInit(appId) {
    if (appId != '')
    {

        window.pAsyncInit = function () {
            PDK.init({
                appId: appId,
                cookie: true,
            });
        };
        (function (d, s, id) {
            var js, pjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//assets.pinterest.com/sdk/sdk.js";
            pjs.parentNode.insertBefore(js, pjs);
        }(document, "script", "pinterest-jssdk"));
    }
}
function PinterestLoginInit() {
    PDK.login({scope: 'read_public'}, function (session) {
        if (!session) {
            alert(pinterestPermissionError);
        } else {
            PDK.me(function (response) {
                if (!response || response.error) {
                    alert(pinterestError);
                } else {

                }
            });
        }
    });
}

function setCookie(name, value, path, domain, secure, document) {
    document.cookie = name + "=" + escape(value) +
            ("; path=/") +
            ((domain) ? "; domain=" + domain : "") +
            ((secure) ? "; secure" : "");
}

function arm_VKAuthCallBack() {
    var user_data = jQuery.parseJSON(jQuery("#arm_vk_user_data").val());
    var arm_social_login_redirect_to = jQuery('#arm_social_login_redirect_to').val();
    jQuery('.arm_social_login_main_container').hide();
    
    jQuery('.arm_social_vk_container').parent('.arm_social_login_main_container').next('.arm_social_connect_loader').show();
    var user_data = {
        'action': 'arm_social_login_callback',
        'action_type': 'vk',
        'id': user_data.userId,
        'first_name': user_data.first_name,
        'last_name': user_data.last_name,
        'user_email': user_data.user_email,
        'display_name': user_data.nickname,
        'redirect_to': arm_social_login_redirect_to,
        'user_profile_picture': user_data.user_profile_picture,
        'userId': user_data.userId,
        'user_login': user_data.user_login,
    };

    jQuery.ajax({
        type: "POST",
        url: __ARMAJAXURL,
        dataType: 'json',
        data: user_data,
        success: function (res) {
            if (res.type == 'redirect') {
                location.href = res.message;
                return false;
            } else {
                if (res.status != 'success') {
                    alert(res.message);
                }
            }
            jQuery('.arm_social_connect_loader').hide();
            return false;
        }
    });
}

jQuery(document).on('click', ".arm_profile_tab_link", function () {
    var tab = jQuery(this).attr('data-tab');
    var $tabWrapper = jQuery(this).parents('.arm_profile_tabs_container');
    $tabWrapper.find('.arm_profile_tab_link').removeClass('arm_profile_tab_link_active');
    jQuery(this).addClass(' arm_profile_tab_link_active');
    if (tab === 'following')
    {
        jQuery(this).addClass('following_count');
    }
    $tabWrapper.find('.arm_profile_tab_detail').css('display', 'none');
    jQuery('.arm_profile_tab_detail[data-tab=' + tab + ']').css('display', 'block');
    return false;
});
jQuery(document).on('click', ".arm_account_link_tab", function (e) {
    var tab = jQuery(this).attr('data-tab');
    var $tabWrapper = jQuery(this).parents('.arm_account_tabs_wrapper');
    var active_tab = $tabWrapper.find('.arm_account_content_active').attr('data-tab');
    if (jQuery(this).hasClass('arm_account_slider')) {
        return;
    }
    if (tab == active_tab) {
        return;
    }

    $tabWrapper.find('.arm_account_link_tab').removeClass('arm_account_link_tab_active');
    $tabWrapper.find('.arm_account_btn_tab').removeClass('arm_account_btn_tab_active');
    $tabWrapper.find('.arm_account_detail_tab').removeClass('arm_account_content_active arm_account_content_left arm_account_content_right');

    jQuery(this).addClass('arm_account_link_tab_active');
    $tabWrapper.find('.arm_account_btn_tab[data-tab=' + tab + ']').addClass('arm_account_btn_tab_active');
    $tabWrapper.find('.arm_account_detail_tab[data-tab=' + tab + ']').addClass('arm_account_content_active');
    $tabWrapper.find('.arm_account_detail_tab[data-tab=' + tab + ']').nextAll('.arm_account_detail_tab').addClass('arm_account_content_right');
    $tabWrapper.find('.arm_account_detail_tab[data-tab=' + tab + ']').prevAll('.arm_account_detail_tab').addClass('arm_account_content_left');

    armAdjustAccountTabs();
    return false;
});
function armAdjustAccountTabs()
{
    jQuery('.arm_account_tabs_wrapper').each(function () {
        var activeTab = jQuery(this).find('.arm_account_link_tab_active');
        var activePosition = activeTab.position();
        var activeWidth = activeTab.outerWidth(true);
        var activeHeight = activeTab.outerHeight();
        jQuery(this).find(".arm_account_slider").css({
            width: activeWidth + "px",
            left: activePosition.left + "px",
            top: (activePosition.top + activeHeight) + "px",
        });
    });
}
jQuery(document).on('click', ".arm_account_btn_tab", function (e) {
    var tab = jQuery(this).attr('data-tab');
    var $tabWrapper = jQuery(this).parents('.arm_account_tabs_wrapper');
    var active_tab = $tabWrapper.find('.arm_account_content_active').attr('data-tab');
    if (jQuery(this).hasClass('arm_account_slider')) {
        return;
    }
    if (tab == active_tab) {
        return;
    }

    $tabWrapper.find('.arm_account_btn_tab').removeClass('arm_account_btn_tab_active');
    jQuery(this).addClass('arm_account_btn_tab_active');
    $tabWrapper.find('.arm_account_link_tab').removeClass('arm_account_link_tab_active');
    $tabWrapper.find('.arm_account_link_tab[data-tab=' + tab + ']').addClass('arm_account_link_tab_active');

    $tabWrapper.find('.arm_account_detail_tab').removeClass('arm_account_content_active arm_account_content_left arm_account_content_right');
    $tabWrapper.find('.arm_account_btn_tab[data-tab=' + tab + ']').addClass('arm_account_btn_tab_active');
    $tabWrapper.find('.arm_account_detail_tab[data-tab=' + tab + ']').addClass('arm_account_content_active');
    $tabWrapper.find('.arm_account_detail_tab[data-tab=' + tab + ']').nextAll('.arm_account_detail_tab').addClass('arm_account_content_right');
    $tabWrapper.find('.arm_account_detail_tab[data-tab=' + tab + ']').prevAll('.arm_account_detail_tab').addClass('arm_account_content_left');

    jQuery(window.opera ? 'html' : 'html, body').animate({scrollTop: jQuery(this).offset().top - 10}, 'slow');
    return false;
});
function arm_form_close_account_action(form)
{
    var form_key = jQuery(form).attr('data-random-id');
    jQuery(form).find('input[name="arm_filter_input"]').remove();
    jQuery(form).find('.arm_close_account_btn').addClass('active');
    jQuery(form).prepend('<input type="hidden" name="form_random_key" value="' + form_key + '" />');
    var close_account = jQuery(form).serialize();
    jQuery(form).find('input[name="form_random_key"]').remove();
    jQuery.ajax({
        url: __ARMAJAXURL,
        type: 'POST',
        dataType: 'json',
        data: 'action=arm_close_account_form_submit_action&' + close_account,
        success: function (response)
        {
            if (response.type == 'success') {
                location.href = response.url;
            } else {
                var msg = (response.msg != '') ? response.msg : closeAccountError;
                msg += '<i class="armfa armfa-times"></i>';
                jQuery('.arm_close_account_form_container').find('#arm_message_text.arm_error_msg').html(msg);
                jQuery('.arm_close_account_form_container').find('.arm_form_message_container').show().delay(10000).fadeOut(2000);
                jQuery('.arm_close_account_form_container').find('.arm_form_message_container .arm_error_msg').show().delay(10000).fadeOut(2000);
                jQuery(window.opera ? 'html' : 'html, body').animate({scrollTop: jQuery('.arm_close_account_form_container').find('.arm_form_message_container').offset().top - 50}, 'slow');
            }
            jQuery(form).find('.arm_close_account_btn').removeClass('active');
        }
    });
    return false;
}
jQuery.fn.armSortElements = (function () {
    var sort = [].sort;
    return function (comparator, getSortable) {
        getSortable = getSortable || function () {
            return this;
        };
        var placements = this.map(function () {
            var sortElement = getSortable.call(this),
                    parentNode = sortElement.parentNode,
                    nextSibling = parentNode.insertBefore(document.createTextNode(''), sortElement.nextSibling);
            return function () {
                if (parentNode === this) {
                    throw new Error("You can't sort elements if any one is a descendant of another.");
                }
                parentNode.insertBefore(this, nextSibling);
                parentNode.removeChild(nextSibling);
            };
        });
        return sort.call(this, comparator).each(function (i) {
            placements[i].call(getSortable.call(this));
        });
    };
})();
function armvalidatenumber(event)
{
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset;

    if ((verOffset = nAgt.indexOf("OPR/")) != -1) {
        browserName = "Opera";
    } else if ((verOffset = nAgt.indexOf("Opera")) != -1) {
        browserName = "Opera";
    } else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
        browserName = "Microsoft Internet Explorer";
        browserName = "Netscape";
        fullVersion = nAgt.substring(verOffset + 5);
    } else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
        browserName = "Chrome";
    } else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
        browserName = "Safari";
    } else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
        browserName = "Firefox";
    } else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
        browserName = nAgt.substring(nameOffset, verOffset);
        if (browserName.toLowerCase() == browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }

    if (browserName == "Chrome" || browserName == "Safari" || browserName == "Opera")
    {
        if (jQuery.inArray(event.keyCode, [8, 9, 27, 46, 13, 116]) !== -1 ||
                (event.keyCode == 173 && event.shiftKey == false) ||
                (event.keyCode == 65 && event.ctrlKey === true) ||
                (event.keyCode == 67 && event.ctrlKey === true) ||
                (event.keyCode == 88 && event.ctrlKey === true) ||
                (event.keyCode >= 35 && event.keyCode <= 39)) {
            return;
        } else {
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    } else if (browserName == "Firefox") {
        if (jQuery.inArray(event.keyCode, [8, 9, 27, 46, 13, 116]) !== -1 ||
                (event.keyCode == 173 && event.shiftKey == false) ||
                (event.keyCode == 65 && event.ctrlKey === true) ||
                (event.keyCode == 67 && event.ctrlKey === true) ||
                (event.keyCode == 88 && event.ctrlKey === true) ||
                (event.keyCode >= 35 && event.keyCode <= 39)) {
            return;
        } else {
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    } else if (browserName == "Microsoft Internet Explorer" || browserName == "Netscape") {
        if (jQuery.inArray(event.keyCode, [8, 9, 27, 46, 13, 116]) !== -1 ||
                (event.keyCode == 173 && event.shiftKey == false) ||
                (event.keyCode == 65 && event.ctrlKey === true) ||
                (event.keyCode == 67 && event.ctrlKey === true) ||
                (event.keyCode == 88 && event.ctrlKey === true) ||
                (event.keyCode >= 35 && event.keyCode <= 39)) {
            return;
        } else {
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault ? event.preventDefault() : event.returnValue = false;
            }
        }
    } else {
        if (jQuery.inArray(event.keyCode, [8, 9, 27, 46, 13, 116]) !== -1 ||
                (event.keyCode == 173 && event.shiftKey == false) ||
                (event.keyCode == 65 && event.ctrlKey === true) ||
                (event.keyCode == 67 && event.ctrlKey === true) ||
                (event.keyCode == 88 && event.ctrlKey === true) ||
                (event.keyCode >= 35 && event.keyCode <= 39)) {
            return;
        } else {
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    }
}
function arm_equal_hight_setup_plan()
{
    if (jQuery(window).outerWidth() <= 500) {

            jQuery('.arm_membership_setup_form').find('.arm_module_plans_ul').each(function () {
            jQuery(this).find('.arm_module_plan_option').css('height', '');
            jQuery(this).find('.arm_module_plan_name').css('height', '');
        });
    } else {
    	jQuery('.arm_membership_setup_form').each(function () {

            var arm_membership_setup_form = jQuery('.arm_membership_setup_form');

            if(arm_membership_setup_form.find('.arm_module_plans_main_container').length > 0) {
                
                if (arm_membership_setup_form.find('.arm_module_plans_ul li').length > 0) {
                    arm_membership_setup_form.find('.arm_module_plans_ul').each(function () {
                        jQuery(this).find('li').each(function () {
                            jQuery(this).find('.arm_module_plan_option').css('height', 'auto');
                            jQuery(this).find('.arm_module_plan_name').css('height', 'auto');
                        });

                        var section_height = 0;
                        jQuery(this).find('li.arm_setup_column_item').each(function (x) {
                            var new_section_height = jQuery(this).find('.arm_module_plan_name').height();
                            if (new_section_height && section_height < new_section_height) {
                                section_height = new_section_height;
                            }
                        });

                        if (section_height > 0) {
                            jQuery(this).find('li.arm_setup_column_item').each(function () {


                                jQuery(this).find('.arm_module_plan_name').height(section_height);
                            });
                        }
                        var max_height = 0;
                        jQuery(this).find('li.arm_setup_column_item').each(function (x) {
                            var new_height = jQuery(this).find('.arm_module_plan_option').outerHeight();

                            if (new_height && max_height < new_height) {
                                max_height = new_height;
                            }
                        });

                        if (max_height > 0) {
                            jQuery(this).find('li.arm_setup_column_item').each(function () {
                                jQuery(this).find('.arm_module_plan_option').parent().attr('style', 'height:'+max_height+'px !important;');
                                
                                jQuery(this).find('.arm_module_plan_option').attr('style', 'height:'+max_height+'px !important;');
                            });
                        }
                    });
                }
                
            }

            if(arm_membership_setup_form.find('.arm_setup_paymentcyclebox_main_wrapper').length > 0) {
                
                if(arm_membership_setup_form.find('.arm_setup_paymentcyclebox_wrapper .arm_module_payment_cycle_container').length > 0)
                {
                    
                   
                    jQuery('.arm_membership_setup_form').find('.arm_module_payment_cycle_container').each(function () {
                        
                        if (jQuery('.arm_membership_setup_form').find('.arm_module_payment_cycle_ul li').length > 0) {

                            jQuery('.arm_membership_setup_form').find('.arm_module_payment_cycle_ul').each(function () {
                                jQuery(this).find('li').each(function () {
                                    jQuery(this).find('.arm_module_payment_cycle_option').css('height', 'auto');
                                    jQuery(this).find('.arm_module_payment_cycle_name').css('height', 'auto');
                                });

                                var section_height = 0;
                                jQuery(this).find('li.arm_setup_column_item').each(function (x) {
                                    var new_section_height = jQuery(this).find('.arm_module_payment_cycle_name').height();
                                    if (new_section_height && section_height < new_section_height) {
                                        section_height = new_section_height;
                                    }
                                });

                                if (section_height > 0) {
                                    jQuery(this).find('li.arm_setup_column_item').each(function () {
                                        jQuery(this).find('.arm_module_payment_cycle_name').height(section_height);
                                        jQuery(this).find('.arm_module_payment_cycle_name').css('line-height', section_height+"px");
                                    });
                                }

                                var max_height = 0;
                                jQuery(this).find('li.arm_setup_column_item').each(function (x) {
                                    var new_height = jQuery(this).find('.arm_module_payment_cycle_option').outerHeight();

                                    if (new_height && max_height < new_height) {
                                        max_height = new_height;
                                    }
                                });


                                if (max_height > 0) {
                                    jQuery(this).find('li.arm_setup_column_item').each(function () {
                                        jQuery(this).find('.arm_module_payment_cycle_option').parent().attr('style', 'height:'+max_height+'px !important;');
                                        
                                        jQuery(this).find('.arm_module_payment_cycle_option').attr('style', 'height:'+max_height+'px !important;');
                                    });
                                }
                            });
                        }
                        
                    });

                    
                }
                
            }

            if(arm_membership_setup_form.find('.arm_setup_gatewaybox_main_wrapper').length > 0) {
                

                if (arm_membership_setup_form.find('.arm_module_gateways_ul li').length > 0) {

                    jQuery('.arm_membership_setup_form').find('.arm_module_gateways_ul').each(function () {
                        jQuery(this).find('li').each(function () {
                            jQuery(this).find('.arm_module_gateway_option').css('height', 'auto');
                            jQuery(this).find('.arm_module_gateway_name').css('height', 'auto');
                        });
                        var section_height = 0;
                        jQuery(this).find('li.arm_setup_column_item').each(function (x) {
                            var new_section_height = jQuery(this).find('.arm_module_gateway_name').height();
                            if (new_section_height && section_height < new_section_height) {
                                section_height = new_section_height;
                            }
                        });


                        if (section_height > 0) {
                            jQuery(this).find('li.arm_setup_column_item').each(function () {
                                jQuery(this).find('.arm_module_gateway_name').height(section_height);
                                jQuery(this).find('.arm_module_gateway_name').css('line-height', section_height+"px");
                            });
                        }
                        var max_height = 0;
                        jQuery(this).find('li.arm_setup_column_item').each(function (x) {
                            var new_height = jQuery(this).find('.arm_module_gateway_option').outerHeight();

                            if (new_height && max_height < new_height) {
                                max_height = new_height;
                            }
                        });


                        if (max_height > 0) {
                            jQuery(this).find('li.arm_setup_column_item').each(function () {
                                jQuery(this).find('.arm_module_gateway_option').parent().attr('style', 'height:'+max_height+'px !important;');
                                
                                jQuery(this).find('.arm_module_gateway_option').attr('style', 'height:'+max_height+'px !important;');
                            });
                        }
                    });
                }

            }
        });
    }
}
function armAdjustDirectoryTemplateBox()
{
    jQuery('.arm_template_wrapper_directorytemplate1, .arm_template_wrapper_directorytemplate3').each(function () {
        if (jQuery(this).find('.arm_directory_container .arm_user_block').length > 0) {
            jQuery(this).find('.arm_directory_container .arm_user_block').css('height', 'auto');
            var max_height = 0;
            jQuery(this).find('.arm_directory_container .arm_user_block').each(function (x) {
                var new_height = jQuery(this).height();
                if (new_height && max_height < new_height) {
                    max_height = new_height;
                }
            });
            jQuery(this).find('.arm_directory_container .arm_user_block').height(max_height);
        }
    });
    arm_set_directory_template_style();
}

function arm_set_plan_width() {
    if (jQuery('.arm_membership_setup_form').length > 0) {
        jQuery('.arm_plan_separator').remove();
        jQuery('.arm_membership_setup_form').each(function () {
            var $thisSetup = jQuery(this);
            var two_class = $thisSetup.find('.arm_module_plans_ul').hasClass('arm_column_2');
            var three_class = $thisSetup.find('.arm_module_plans_ul').hasClass('arm_column_3');
            var four_class = $thisSetup.find('.arm_module_plans_ul').hasClass('arm_column_4');
            if (two_class) {
                $thisSetup.find('ul.arm_module_plans_ul > li').each(function (i) {
                    if ((i + 1) % 2 == 0) {
                        jQuery(this).after("<li class='arm_plan_separator'></li>");
                    }
                });
            }
            if (three_class) {
                $thisSetup.find('ul.arm_module_plans_ul > li').each(function (i) {
                    if ((i + 1) % 3 == 0) {
                        jQuery(this).after("<li class='arm_plan_separator'></li>");
                    }
                });
            }
            if (four_class) {
                $thisSetup.find('ul.arm_module_plans_ul > li').each(function (i) {
                    if ((i + 1) % 4 == 0) {
                        jQuery(this).after("<li class='arm_plan_separator'></li>");
                    }
                });
            }
        });
    }
}

function arm_set_directory_template_style() {
    var window_width = jQuery(window).width();
    jQuery('.arm_user_block').removeClass('remove_bottom_border');
    jQuery('.arm_user_block').removeClass('remove_bottom_border_preview');
    if (jQuery('.arm_template_wrapper').length > 0) {
        jQuery('.arm_template_wrapper').each(function () {
            var $this = jQuery(this);
            var first_directory_template = 'arm_template_wrapper_directorytemplate1';
            var second_directory_template = 'arm_template_wrapper_directorytemplate2';
            var third_directory_template = 'arm_template_wrapper_directorytemplate3';
            var fourth_directory_template = 'arm_template_wrapper_directorytemplate4';
            var module_value = 3;
            if (window_width <= 768 && window_width > 500) {
                var module_value = 2;
            }
            jQuery('.arm_directorytemplate1_seperator').remove();
            if ($this.hasClass(first_directory_template)) {
                var total_block = $this.find('.arm_user_block').length;
                if (total_block > 0) {
                    var n = 1;
                    jQuery('.arm_user_block').removeClass('arm_directorytemplate1_last_field');
                    jQuery('.arm_user_block').removeClass('arm_first_user_block');
                    $this.find('.arm_user_block').each(function (e) {
                        $this_ = jQuery(this);
                        if (e == 0 || n % module_value == 0) {
                            $this_.addClass('arm_first_user_block');
                        } else if (e % module_value == 0) {
                            $this_.addClass('arm_directorytemplate1_last_field');
                        }
                        if (n == total_block && $this.prev(2).hasClass('arm_directorytemplate1_last_field')) {
                        }
                        if (total_block == n && $this_.hasClass('arm_first_user_block')) {
                            $this_.addClass('arm_last_row_first_user_block');
                        }
                        if (n % module_value == 0 && n != total_block) {
                            $this_.after('<div class="arm_user_block arm_directorytemplate1_seperator"></div>');
                        }
                        n++;
                    });
                }
            }
        });
    }
    if (window_width <= 500 || jQuery('.arm_template_preview_popup').hasClass('arm_mobile_wrapper')) {
        var class_ = jQuery('.arm_directory_paging_container').prev().attr('class');
        var regex = /arm_user_block/ig;
        if (jQuery('.arm_template_preview_popup').hasClass('arm_mobile_wrapper')) {
            var edit_class = 'remove_bottom_border_preview'
        } else {
            var edit_class = 'remove_bottom_border'
        }
        if (regex.test(class_)) {
            jQuery('.arm_directory_paging_container').prev().addClass(edit_class);
        }
    }
}
function arm_slider_widget_init() {
    if (jQuery.isFunction(jQuery().carouFredSel)) {
        jQuery('.arm_widget_slider_wrapper_container').each(function () {
            var effect = jQuery(this).attr('data-effect');
            var slider_effect = ((typeof effect != 'undefined') && effect != '') ? effect : 'slide';
            var carouselOptions = {
                circular: true,
                items: 1,
                responsive: true,
                width: '100%',
                auto: {
                    items: 1,
                    play: true,
                    fx: slider_effect,
                    easing: false,
                    duration: 1000
                }
            };
            jQuery(this).carouFredSel(carouselOptions);
        });
    }
}

function arm_do_bootstrap_angular() {
    var __FORM_OBJ = [];
    var form_ids = [];
    jQuery('.arm_member_form_container').each(function (e) {
        var form = jQuery(this).find('form');
        var id = form.attr('id');
        if (typeof id != 'undefined') {
            form_ids.push(id);
        }
    });

    jQuery('.arm_setup_form_container').each(function () {
        var form = jQuery(this).find('form');
        var id = form.attr('id');
        if (typeof id != 'undefined') {
            form_ids.push(id);
        }
    });

    jQuery('.arm_close_account_container').each(function () {
        var form = jQuery(this).find('form');
        var id = form.attr('id');
        if (typeof id != 'undefined') {
            form_ids.push(id);
        }
    });

    if (typeof form_ids != 'undefined' && form_ids.length > 0) {
        for (var n in form_ids) {
            if (typeof form_ids[n] != "undefined") {
                var form_obj = jQuery('#' + form_ids[n]);
                if (typeof angular != "undefined") {
                    try {
                        angular.bootstrap(form_obj, ["ARMApp"]);
                    } catch (e) {
                    }
                }
                var nonce_start_time = form_obj.find('#nonce_start_time').val();
                var nonce_keyboard_press = form_obj.find('#nonce_keyboard_press').val();
                arm_spam_filter_keypress_check(nonce_start_time, nonce_keyboard_press);
                if (typeof form_obj.attr('data-submission-key') != 'undefined') {
                    var formSubmissionKey = form_obj.attr('data-submission-key');
                    var filteredInput = document.createElement('input');
                    filteredInput.setAttribute('type', 'text');
                    filteredInput.setAttribute('style', 'visibility:hidden !important;display:none !important;opacity:0 !important;');
                    filteredInput.setAttribute('name', formSubmissionKey);
                    form_obj.removeAttr('data-submission-key');
                    form_obj.append(filteredInput);
                }
            }
        }
    }
}

function arm_spam_filter_keypress_check(nonce_start_time, nonce_keyboard_press) {
    var keysPressed = 0;
    (function () {
        for (var e = function (e) {
            var t = new Array, s = 0, r = document.getElementsByTagName("input");
            for (n = 0; n < r.length; n++)
                r[n].className == e && (t[s] = r[n], s++);
            return t
        }, t = e("stime"), n = 0; n < t.length; n++)
            t[n].setAttribute("name", nonce_start_time);
        var s = e("kpress");
        document.onkeydown = function () {
            keysPressed++;
            for (var e = 0; e < s.length; e++)
                s[e].setAttribute("name", nonce_keyboard_press), s[e].value = keysPressed
        }, document.addEventListener("click", function (e) {
            e = e || window.event;
            var t = e.target || e.srcElement;
            if ("submit" == t.type) {
                keysPressed++;
                for (var n = 0; n < s.length; n++)
                    s[n].setAttribute("name", nonce_keyboard_press), s[n].value = keysPressed
            }
        }, !1)
    })();
}

function arm_reinit_session_var(form, ajaxurl, form_key) {
    jQuery.ajax({
        type: "POST",
        url: ajaxurl,
        dataType: 'json',
        data: 'action=arm_reinit_session&form_key=' + form_key,
        success: function (response) {
            var new_field_name = response.new_var;
            var $filter_field = jQuery(form).find('input').last();
            $filter_field[0].setAttribute('name', new_field_name)
            $filter_field.before("<input type='text' name='arm_filter_input' value='' style='opacity:0 !important;display:none !important;visibility:hidden !important;' />");
        }
    });
}

function arm_icheck_init()
{
    if (jQuery.isFunction(jQuery().iCheck))
    {

        jQuery('.arm_icheckbox').iCheck({
            checkboxClass: 'icheckbox_minimal-red',
            radioClass: 'iradio_minimal-red',
            increaseArea: '20%',
            disabledClass: '',
        });
        jQuery('.arm_icheckbox').on('ifChanged', function (event) {
            jQuery(this).trigger('change');
        });
        jQuery('.arm_icheckbox').on('ifClicked', function (event) {
            jQuery(this).trigger('click');
        });
        jQuery('.arm_iradio').iCheck({
            checkboxClass: 'icheckbox_minimal-red',
            radioClass: 'iradio_minimal-red',
            increaseArea: '20%',
            disabledClass: '',
        });
        jQuery('.arm_iradio').on('ifChanged', function (event) {
            jQuery(this).trigger('change');
        });
        jQuery('.arm_iradio').on('ifClicked', function (event) {
            jQuery(this).trigger('click');
        });
    }
}

jQuery(document).on('change', '.arm_selected_payment_mode', function () {


    armResetCouponCode(form);
    if (plan_skin === 'skin5') {
        armUpdateOrderAmount1(planInput, form, 0);
    } else {
        armUpdateOrderAmount(form, 0);
    }


    if (jQuery(this).is(':checked'))
    {
        var form = jQuery(this).parents('form:first');

       
        var arm_form_id = '#'+form.attr('id')+' ';
        var arm_total_payable_amount = jQuery(form).find('#arm_total_payable_amount').val();

        var gateway_skin = jQuery(form).find('#arm_front_gateway_skin_type').val();

        var plan_skin = jQuery(form).find('#arm_front_plan_skin_type').val();
        var arm_selected_payment_mode = jQuery(this).val();
        if (plan_skin == 'skin5')
        {
            var container = jQuery(form).find('.arm_module_plan_input').attr('aria-owns');
            var planInput = jQuery('#'+container).find('md-option:selected');
        }
        if (gateway_skin == 'radio')
        {
            var gateway = jQuery(form).find('input[name=payment_gateway]:checked').attr('value');
            jQuery(form).find('.arm_module_gateway_fields').not('.arm_module_gateway_fields_' + gateway).slideUp('slow').addClass('arm_hide');
           
            jQuery(arm_form_id+'.arm_module_gateway_fields_' + gateway).slideDown('slow').removeClass('arm_hide');
        }
        else
        {
           

            var gateway_container = jQuery(form).find('.arm_module_gateway_input').attr('aria-owns');
            var gateway_obj = jQuery('#'+gateway_container).find('md-option:selected');
            var gateway = gateway_obj.attr('value');

            jQuery(arm_form_id+'.arm_module_gateway_fields').not('.arm_module_gateway_fields_' + gateway).slideUp('slow').addClass('arm_hide');
           
            jQuery(arm_form_id+'.arm_module_gateway_fields_' + gateway).slideDown('slow').removeClass('arm_hide');
        }



        armResetCouponCode(form);
        if (plan_skin === 'skin5') {
            armUpdateOrderAmount1(planInput, form, 0);
        } else {
            armUpdateOrderAmount(form, 0);
        }
    }
});

function armResetCouponCode(form) {
    if (typeof angular != 'undefined') {
        var scope = angular.element('[data-ng-controller=ARMCtrl]').scope();
        if (typeof scope != 'undefined') {
            if (typeof scope.arm_form.arm_coupon_code != 'undefined') {
                jQuery(form).find('input[name="arm_coupon_code"]').val('');
                if (jQuery(form).find('input[name="arm_coupon_code"]').attr('data-isRequiredCoupon') == 'true') {
                    scope.arm_form.arm_coupon_code.$modelValue = '';
                }
                scope.arm_form.arm_coupon_code.$setViewValue(null);
                scope.arm_form.arm_coupon_code.$setPristine();
                scope.arm_form.arm_coupon_code.$setUntouched();
            }
        }
    }
    jQuery(form).find('.arm_apply_coupon_container').find('.notify_msg').remove();
}
jQuery(document).on('click', '.arm_renew_subscription_button', function () {
    var plan_id = jQuery(this).attr('data-plan_id');
    var loader_img = jQuery(this).closest('form').find('#loader_img').val();
    var setup_id = jQuery(this).closest('form').find('#setup_id').val();
    var from_style_css = jQuery(this).closest('form').find('#arm_form_style_css').val();
  
    var arm_font_awsome = jQuery(this).closest('form').find('#arm_font_awsome').val();
    var stripe_js = jQuery(this).closest('form').find('#arm_stripe_js').val();
    jQuery('.arm_current_membership_container').html('');
    jQuery('.arm_current_membership_container_loader_img').html('<div class="arm_loading_grid"><img src="' + loader_img + '" alt="' + ARM_Loding + '"></div>');
    jQuery.ajax({
        type: "POST",
        url: __ARMAJAXURL,
        data: 'action=arm_renew_plan_action&plan_id=' + plan_id + '&setup_id=' + setup_id,
        dataType: 'html',
        success: function (res) {


            var script = document.getElementsByTagName('script');
            var link = document.getElementsByTagName('link');

            var spt = script.length, lnk = link.length, from_style_css_loaded = false, arm_font_awsome_loaded = false, stripe_js_loaded = false;

            while (spt--) {
               
                if (typeof script[spt].src != 'undefined' && script[spt].src == stripe_js) {
                    stripe_js_loaded = true;
                }
            }

            while (lnk--) {
                if (typeof link[lnk].href != 'undefined' && link[lnk].href == from_style_css) {
                    from_style_css_loaded = true;
                }

                if (typeof link[lnk].href != 'undefined' && link[lnk].href == arm_font_awsome) {
                    arm_font_awsome_loaded = true;
                }
            }


            if (!stripe_js_loaded) {
                arm_create_script_node(document, 'script', 'stripe_js', stripe_js);
            }

            if (!from_style_css_loaded) {
                arm_create_link_node(document, 'link', 'arm_form_style_css', from_style_css);
            }

            if (!arm_font_awsome_loaded) {
                arm_create_link_node(document, 'link', 'arm-font-awesome-css', arm_font_awsome);
            }


            var stripe_interval = setInterval(function () {

                if (Stripe != undefined) {

                  
                    jQuery('.arm_current_membership_container').html(res);
                    arm_do_bootstrap_angular();
                    var interval = setInterval(function () {
                            armSetupHideShowSections(jQuery('.arm_membership_setup_form'));
                        setTimeout(function () {
                            jQuery('.arm_current_membership_container_loader_img').remove();
                            jQuery('.arm_current_membership_container .arm_setup_form_container').css('display', 'block');
                        }, 1000);
                        clearInterval(interval);
                    }, 1000);

                    clearInterval(stripe_interval);
                }
                else {

                }

            }, 1000);

        }
    });
});

function arm_create_script_node(doc, tag, id, url) {
    var js, fjs = doc.getElementsByTagName(tag)[0];
    if (doc.getElementById(id)) {
        return;
    }
    js = doc.createElement(tag);
    js.id = id;
    js.src = url;
    fjs.parentNode.insertBefore(js, fjs);
}

function arm_create_link_node(doc, tag, id, url) {
    var css, fcss = doc.getElementsByTagName(tag)[0];
    if (doc.getElementById(id)) {
        return;
    }
    css = doc.createElement(tag);
    css.id = id;
    css.href = url;
    css.rel = 'stylesheet';

    fcss.parentNode.insertBefore(css, fcss);
}


jQuery(document).on('click', '.arm_front_invoice_detail', function () {
    var log_id = jQuery(this).attr('data-log_id');
    var log_type = jQuery(this).attr('data-log_type');
    var from_style_css = jQuery(this).closest('form').find('#arm_form_style_css').val();

    if (log_id != '' && log_id != 0)
    {

        jQuery.ajax({
            type: "POST",
            url: __ARMAJAXURL,
            data: "action=arm_invoice_detail&log_id=" + log_id + "&log_type=" + log_type,
            success: function (response) {
                if (response != '')
                {

                    jQuery('.arm_invoice_detail_container').html(response);
                    var bPopup = jQuery('.arm_invoice_detail_popup').bPopup({
                        opacity: 0.5,
                        follow: [false, false],
                        closeClass: 'arm_invoice_detail_close_btn',
                        onClose: function () {
                            jQuery('.arm_invoice_detail_popup').remove();
                        }
                    });
                    bPopup.reposition(100);

                } else {
                    alert(invoiceTransactionError);
                }
            }
        });
    }
    return false;
});

jQuery(document).ready(function(){

if(jQuery('.arm_current_membership_container').length){
    var current_membership_wrapper_width = jQuery('.arm_current_membership_container').outerWidth();
    if(current_membership_wrapper_width <= 768){
        jQuery('.arm_current_membership_container').css('overflow-x', 'auto');
        jQuery('.arm_current_membership_list_header th#arm_cm_plan_action_btn').css('min-width', '100px');
        jQuery('.arm_cm_renew_btn_div').css('width', '100%');
        jQuery('.arm_cm_cancel_btn_div').css('width', '100%');
        jQuery('.arm_cm_cancel_btn_div').css('margin-top', '10px');
    }

}

});
jQuery(document).on('click', '#arm_setup_two_step_next', function(){
    var obj = jQuery(this).parents('form');

    obj.find('.arm_module_forms_main_container').removeClass('arm_hide');
    obj.find('.arm_setup_gatewaybox_main_wrapper').removeClass('arm_hide');
    obj.find('.arm_payment_mode_main_wrapper').removeClass('arm_hide');
    obj.find('.arm_setup_couponbox_main_wrapper').removeClass('arm_hide');
    obj.find('.arm_setup_summary_text_main_container').removeClass('arm_hide');
    obj.find('.arm_setup_summary_text_container').removeClass('arm_hide');   
    obj.find('.arm_setup_submit_btn_main_wrapper').removeClass('arm_hide');
    obj.find('.arm_setup_paymentcyclebox_main_wrapper').slideUp();  
    obj.find('.arm_module_plans_main_container').slideUp();
    obj.find('.arm_setup_two_step_next_wrapper').slideUp();
    obj.find('.arm_setup_two_step_previous_wrapper').slideDown();
    
    arm_set_plan_height(obj);

});

function arm_set_plan_height(form_obj){
    var arm_membership_setup_form = form_obj;
    if (arm_membership_setup_form.find('.arm_setup_gatewaybox_main_wrapper').length > 0) {
        if (arm_membership_setup_form.find('.arm_module_gateways_ul li').length > 0) {
            jQuery('.arm_membership_setup_form').find('.arm_module_gateways_ul').each(function() {
                jQuery(this).find('li').each(function() {
                    jQuery(this).find('.arm_module_gateway_option').css('height', 'auto');
                    jQuery(this).find('.arm_module_gateway_name').css('height', 'auto');
                });
                var section_height = 0;
                jQuery(this).find('li.arm_setup_column_item').each(function(x) {
                    var new_section_height = jQuery(this).find('.arm_module_gateway_name').height();
                    if (new_section_height && section_height < new_section_height) {
                        section_height = new_section_height;
                    }
                });
                if (section_height > 0) {
                    jQuery(this).find('li.arm_setup_column_item').each(function() {
                        jQuery(this).find('.arm_module_gateway_name').height(section_height);
                        jQuery(this).find('.arm_module_gateway_name').css('line-height', section_height + "px");
                    });
                }
                var max_height = 0;
                jQuery(this).find('li.arm_setup_column_item').each(function(x) {
                    var new_height = jQuery(this).find('.arm_module_gateway_option').outerHeight();
                    if (new_height && max_height < new_height) {
                        max_height = new_height;
                    }
                });
                if (max_height > 0) {
                    jQuery(this).find('li.arm_setup_column_item').each(function() {
                        jQuery(this).find('.arm_module_gateway_option').parent().attr('style', 'height:' + max_height + 'px !important;');
                        jQuery(this).find('.arm_module_gateway_option').attr('style', 'height:' + max_height + 'px !important;');
                    });
                }
            });
        }
    }
}

jQuery(document).on('click', '#arm_setup_two_step_previous', function(){

    var obj = jQuery(this).parents('form');

    obj.find('.arm_module_forms_main_container').addClass('arm_hide');
    obj.find('.arm_setup_gatewaybox_main_wrapper').addClass('arm_hide');
    obj.find('.arm_payment_mode_main_wrapper').addClass('arm_hide');
    obj.find('.arm_setup_couponbox_main_wrapper').addClass('arm_hide');
    obj.find('.arm_setup_summary_text_main_container').removeClass('arm_hide');
    obj.find('.arm_setup_summary_text_container').addClass('arm_hide');   
    obj.find('.arm_setup_submit_btn_main_wrapper').addClass('arm_hide');
    obj.find('.arm_setup_paymentcyclebox_main_wrapper').slideDown();  
    obj.find('.arm_module_plans_main_container').slideDown();
    obj.find('.arm_setup_two_step_next_wrapper').slideDown();
    obj.find('.arm_setup_two_step_previous_wrapper').slideUp();

});

(function($) {
    $.fn.hasScrollBar = function() {
        return this.get(0).scrollHeight > this.height();
    }
})(jQuery);

function armGetLastScrollableElement(object){
    var obj = jQuery(object);
    var parents = obj.parentsUntil('body');
    var totalParents = parents.length;
    var n = 0;
    var objs = [];
    var o = 0;
    while(n < totalParents){
        var currentNode = parents[n];
        if( typeof currentNode != 'undefined' && jQuery(currentNode).hasScrollBar() ){
            objs[o] = jQuery(currentNode);
            o++;
        }
        n++;
    }
    var obj_len = objs.length;
    return objs[obj_len - 1];
}

jQuery(document).on('mouseup',function(e){
    if( jQuery('.arm_popup_wrapper:visible').length > 0 ){
        var target = jQuery(e.target);
        var selectLength = target.parents('.md-select-menu-container').length;
        var formLength = target.parents('.popup_content_text').length;
        if( (selectLength == 0 && formLength == 1) || target.hasClass('popup_content_text') ){
            jQuery('.md-select-backdrop').trigger('click');
        }
    }
})