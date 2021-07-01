function fetchGitHubInformation(event) {

    var username = $("#gh-username").val();
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/images/loader.gif" alt="loading..." />
        </div>`);

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`)
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        function (firstResponse, secondResponse) {
            var userData = firstResponse[0];
            var userData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(userInformationHTML(repoData));
        },
        function (errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(
                    `<h2>No info found for user ${username}</h2>`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        });
}