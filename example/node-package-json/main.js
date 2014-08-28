var builder     = require('./index'),
    ConfigError = require('./lib/error'),
    definition, result;

definition = builder('my_config');

definition
    .children()
        .stringNode('name')
            .isRequired()
        .end()
        .stringNode('version').end()
        .objectNode('support')
            .children()
                .stringNode('homepage').isRequired().end()
            .end()
        .end()
        .arrayNode('leet')
            .isRequired()
            .hasKey(1).hasKey(3).hasKey(7)
            .lengthOf(4)
        .end()
        .variableObjectNode('scripts').isRequired().end()
    .end();

try {
    result = definition.deploy({
        name: 'my-name',
        version: '1.2.0',
        support: {
            homepage: 'http://www.google.com'
        },
        leet: [1, 3, 3, 7]
    });

    console.log('------');
    console.log(result);
} catch (error) {
    console.error(error.path + ': ' + error.message);
}