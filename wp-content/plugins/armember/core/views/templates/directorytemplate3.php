<?php 
if (isset($user) && !empty($user))
{
	global $arm_member_forms,$arm_members_directory;
    $tempopt = $templateOpt['arm_options'];
    $slected_social_fields = isset($tempopt['arm_social_fields']) ? $tempopt['arm_social_fields'] : array();
    $fileContent .= '<div class="arm_user_block">';
    if(preg_match("@^http@", $user['profile_cover'])){
    $temp_data = explode("://", $user['profile_cover']);
        $cover_url = '//' . $temp_data[1];
    }else{
        $cover_url =$user['profile_cover'];
    }
    $profile_template = $arm_members_directory->arm_get_template_by_id(1);
    $profile_template_opt = $profile_template['arm_options'];
    $default_cover = $profile_template_opt['default_cover'];
    $cover_img_url = ($user['profile_cover'] !== '' ) ? "<img src='" . $cover_url . "' style='width:100%;height:100%;'>" : '<img src="'.$default_cover.'" style="width:100%;height:100%;" />';
		$fileContent .= '<div class="arm_cover_bg_wrapper">'.$cover_img_url.'</div>';
        $fileContent .= '<span class="arm_dp_user_link">';
        $fileContent .= '<div class="arm_user_avatar">' . $user['profile_picture'] . '</div></span>';
		$fileContent .= '<div class="armclear"></div>';
		$fileContent .= '<div class="arm_user_link"><span>' . $user['full_name'].'</span></div>';
        $fileContent .= '<div class="arm_last_active_text">' . $user['text_u7w4b'] . '<br>' . $user['text_dzuxz'] . '</div><p></p>';
		$fileContent .= $user['arm_badges_detail'];
		$fileContent .= '<div class="armclear"></div>';
        if(isset($tempopt['show_joining']) && $tempopt['show_joining'] == true)
                {
        $fileContent .= '<div class="arm_last_active_text"> 3V Member Since <br><strong>' .$user['user_join_date'].'</strong></div>';
                }
		$fileContent .= '<div class="armclear"></div>';
		$fileContent .= "<div class='arm_user_social_blocks'>";
        if (!empty($slected_social_fields)) {
            foreach ($slected_social_fields as $skey) {
                $spfMetaKey = 'arm_social_field_'.$skey;
                if (in_array($skey, $slected_social_fields)) {
                    $skey_field = get_user_meta($user['ID'],$spfMetaKey,true);
                    if( isset($skey_field) && !empty($skey_field) && $skey === 'linkedin' ) {
                        $fileContent .= '<div class="arm_view_profile_btn_wrapper"><a target="_blank" href="' . $skey_field . '" class="arm_view_profile_user_link"><i class="fa fa-facebook-official fa-2x fa-pull-left" aria-hidden="true" style="padding-top:2px;margin-left:-10px;"></i>' . $arm_view_profile_label . '</a></div>';
                    }
                }
            }
        }
		$fileContent .= "</div>";
	$fileContent .= '</div>';
}