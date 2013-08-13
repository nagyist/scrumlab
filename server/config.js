path = require('path');

module.exports = {
	gitlab: {
		uri: 'https://intern.chemocompile.de/gitlab',
		api: '/api/v3',
		strictSSL: false
	},
	server: {
		listenPort: 3000,
		securePort: 8433,
		distFolder: path.resolve(__dirname, '../client/dist'),
		staticUrl: '/static',
		secret: '8y*/($7Cc=[|zBfxn-=RY-L<2Ss#=!?+>&ObA4J{*Rs9xC`|Is~;T o-FoFja[Wz'	// https://api.wordpress.org/secret-key/1.1/salt/
	}
};
