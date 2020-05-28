const templates = {};
const webUrl = "www.ourwebsite.com";

templates.newAccountCreated = function (username, password) {
    return `
			<p>Please use the following credentials to login to 
			    <a href="${webUrl}">${webUrl}</a>.
			</p>
			<p>
				<b>User Name:  ${username} </b>
			</p>
			<p>
				<b>Password: ${password} </b>
			</p>`;
};

templates.sendUpdatedPassword = function (username, password) {
    return `
			<p>Your Password had been recently changed.Please reply to this message if it is not you.Thank You
			    <a href="${webUrl}">${webUrl}</a>.
			</p>
			<p>
				<b>User Name:  ${username} </b>
			</p>
			<p>
				<b>Password: ${password} </b>
			</p>`;
};

module.exports = templates;
