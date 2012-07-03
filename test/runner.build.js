({
        baseUrl: '../scripts',
	name: '../test/runner',
	out: 'runner.built.js',
        paths:{
                test: '../test',
                mocha: '../test/mocha/mocha',
                expect: '../test/expect/expect',
                sinon: '../test/sinon/sinon'
        },
	findNestedDependencies: true
})
