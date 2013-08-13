module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-bump');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-karma');


	// Print a timestamp (useful for when watching)
	grunt.registerTask('timestamp', function() {
		grunt.log.subhead(Date());
	});

	// Config
	// -------------------------
	grunt.initConfig({


		// Vars
		pkg: grunt.file.readJSON('package.json'),
		banner:
			'/**\n' +
			' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
			' * <%= pkg.homepage %>\n' +
			' *\n' +
			' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
			' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
			' */\n',
		dir: {
			dist: 'dist',
			src: 'src/**/*.js',
			spec: 'test/**/*.spec.js',
			tpl: {
				src: 'src/app/**/*.tpl.html',
				components: 'src/components/**/*.tpl.html'
			},
			vendor: [
				'vendor/angular/angular.js',
				'vendor/angular-resource/angular-resource.js'
			]
		},
		module: {
			prefix: 'src/prefix',
			suffix: 'src/suffix'
		},


		// Clean
		clean: ['<%= dir.dist %>/*'],

		// Karma
		karma: {
			unit: {
				configFile: 'test/config/karma.conf.js'
			}
		},

		// HTML2JS
		html2js: {
			app: {
				options: {
					base: 'src/app'
				},
				src: ['<%= dir.tpl.src %>'],
				dest: '<%= dir.dist %>/templates/app.js',
				module: 'templates.app'
			},
			component: {
				options: {
					base: 'src/component'
				},
				src: ['<%= dir.tpl.components %>'],
				dest: '<%= dir.dist %>/templates/components.js',
				module: 'templates.components'
			}
		},

		// Concat
		concat: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: [
					'<%= module.prefix %>',
					'<%= dir.src %>',
					'<%= module.suffix %>',
					'<%= dir.vendor %>'
				],
				dest:'<%= dir.dist %>/<%= pkg.name %>.js'
			}
		},

		// Uglify
		uglify: {
			options: {
				reports: 'gzip'
			},
			dist: {
				src: '<%= dir.src %>',
				dest:'<%= dir.dist %>/<%= pkg.name %>.js'
			}
		},

		// Hint
		jshint: {
			files: ['<%= dir.src %>', '<%= dir.spec %>'],
			options:{
				curly:true,
				eqeqeq:true,
				immed:true,
				latedef:true,
				newcap:false,
				noarg:true,
				sub:true,
				boss:true,
				eqnull:true,
				smarttabs:true,
				globals:{}
			}
		}
	});


	// Tasks
	// -------------------------
	grunt.registerTask( 'default', ['build'] );
	grunt.registerTask('build', ['clean', 'html2js', 'jshint', 'concat']);
	grunt.registerTask('test', ['build', 'karma:unit']);

};
