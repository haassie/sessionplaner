<?php

$EM_CONF['sessionplaner'] = [
    'title' => 'Session Planer',
    'description' => '',
    'category' => 'misc',
    'author' => 'Sebastian Fischer, Benjamin Kott',
    'author_email' => 'typo3@evoweb.de, benjamin.kott@outlook.com',
    'author_company' => '',
    'state' => 'stable',
    'clearCacheOnLoad' => 1,
    'version' => '0.0.1',
    'constraints' => [
        'depends' => [
            'typo3' => '6.0.0-8.7.99',
        ],
        'conflicts' => [],
        'suggests' => [],
    ],
    "autoload-dev" => [
        "psr-4" => [
            "Evoweb\\Sessionplaner\\Tests\\" => "Tests/",
        ],
    ],
];