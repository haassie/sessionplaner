<?php

/*
 * This file is part of the package Evoweb\Sessionplaner.
 *
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */

namespace Evoweb\Sessionplaner\Controller;

use Evoweb\Sessionplaner\TitleTagProvider\EventTitleTagProvider;
use TYPO3\CMS\Core\MetaTag\MetaTagManagerRegistry;
use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * Session Controller
 */
class SessionplanController extends \TYPO3\CMS\Extbase\Mvc\Controller\ActionController
{
    /**
     * @var \Evoweb\Sessionplaner\Domain\Repository\DayRepository
     */
    protected $dayRepository;

    /**
     * @var \Evoweb\Sessionplaner\Domain\Repository\SessionRepository
     */
    protected $sessionRepository;

    public function injectDayRepository(\Evoweb\Sessionplaner\Domain\Repository\DayRepository $dayRepository)
    {
        $this->dayRepository = $dayRepository;
    }

    public function injectSessionRepository(
        \Evoweb\Sessionplaner\Domain\Repository\SessionRepository $sessionRepository
    ) {
        $this->sessionRepository = $sessionRepository;
    }

    public function displayAction(\Evoweb\Sessionplaner\Domain\Model\Session $session = null)
    {
        if ($session) {
            $this->forward('show');
        }
        $day = $this->dayRepository->findByUid($this->settings['day']);
        $sessions = $this->sessionRepository->findByDay($this->settings['day']);
        $this->view->assign('day', $day);
        $this->view->assign('sessions', $sessions);
    }

    public function showAction(\Evoweb\Sessionplaner\Domain\Model\Session $session)
    {
        $provider = GeneralUtility::makeInstance(EventTitleTagProvider::class);
        $provider->setTitle($session->getTopic());

        $ogMetaTagManager = GeneralUtility::makeInstance(MetaTagManagerRegistry::class)->getManagerForProperty('og:title');
        $ogMetaTagManager->addProperty('og:title', $session->getTopic());

        $twitterMetaTagManager = GeneralUtility::makeInstance(MetaTagManagerRegistry::class)->getManagerForProperty('twitter:title');
        $twitterMetaTagManager->addProperty('twitter:title', $session->getTopic());

        $this->view->assign('session', $session);
    }

    /**
     * Disable error flash message
     *
     * @return bool
     */
    protected function getErrorFlashMessage()
    {
        return false;
    }
}
