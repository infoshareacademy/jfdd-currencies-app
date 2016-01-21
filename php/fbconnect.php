require_once 'src/facebook.php'; //include the facebook php sdk
$facebook = new Facebook(array(
        'appId'  => 'XXXXXXXXXXXXXX',    //app id
        'secret' => 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // app secret
));
$user = $facebook->getUser();
if ($user) { // check if current user is authenticated
    try {
        // Proceed knowing you have a logged in user who's authenticated.
        $user_profile = $facebook->api('/me');  //get current user's profile information using open graph
            }
         catch(Exception $e){}
}
