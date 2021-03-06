<?php

/*
 * This file is part of the package Evoweb\Sessionplaner.
 *
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */

$languageFile = 'LLL:EXT:sessionplaner/Resources/Private/Language/locallang_tca.xlf:';

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::allowTableOnStandardPages('tx_sessionplaner_domain_model_slot');

return [
    'ctrl' => [
        'title' => $languageFile . 'tx_sessionplaner_domain_model_slot',
        'label' => 'start',
        'tstamp' => 'tstamp',
        'crdate' => 'crdate',
        'default_sortby' => 'ORDER BY start',
        'delete' => 'deleted',
        'enablecolumns' => [
            'disabled' => 'hidden',
        ],
        'iconfile' => 'EXT:sessionplaner/Resources/Public/Icons/iconmonstr-calendar-4_record.svg',
    ],
    'interface' => [
        'showRecordFieldList' => 'start'
    ],
    'columns' => [
        'start' => [
            'exclude' => 0,
            'label' => $languageFile . 'tx_sessionplaner_domain_model_slot-start',
            'config' => [
                'type' => 'input',
                'renderType' => 'inputDateTime',
                'size' => 20,
                'eval' => 'time,required'
            ],
        ],
        'duration' => [
            'label' => $languageFile . 'tx_sessionplaner_domain_model_slot-duration',
            'config' => [
                'type' => 'input',
                'size' => 20,
                'eval' => 'int,trim,required',
                'default' => 45,
                'max' => 256,
            ]
        ],
        'break' => [
            'label' => $languageFile . 'tx_sessionplaner_domain_model_slot-break',
            'config' => [
                'type' => 'check',
            ],
        ],
        'days' => [
            'exclude' => 1,
            'label' => $languageFile . 'tx_sessionplaner_domain_model_slot-days',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectMultipleSideBySide',
                'foreign_table' => 'tx_sessionplaner_domain_model_day',
                'foreign_table_where' => 'AND tx_sessionplaner_domain_model_day.pid = ###CURRENT_PID###',
                'MM' => 'tx_sessionplaner_day_slot_mm',
                'MM_opposite_field' => 'slots',
                'size' => 5,
                'minitems' => 0,
                'maxitems' => 100,
                'autoSizeMax' => 20,
            ],
        ],
        'rooms' => [
            'exclude' => 1,
            'label' => $languageFile . 'tx_sessionplaner_domain_model_slot-rooms',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectMultipleSideBySide',
                'foreign_table' => 'tx_sessionplaner_domain_model_room',
                'foreign_table_where' => 'AND tx_sessionplaner_domain_model_room.pid = ###CURRENT_PID###',
                'MM' => 'tx_sessionplaner_room_slot_mm',
                'MM_opposite_field' => 'slots',
                'size' => 10,
                'minitems' => 0,
                'maxitems' => 100,
                'autoSizeMax' => 20,
            ],
        ],
    ],
    'types' => [
        '0' => [
            'showitem' => '
            start,
            duration,
            break,
            days,
            rooms
            '
        ]
    ],
];
