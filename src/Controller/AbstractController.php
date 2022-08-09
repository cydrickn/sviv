<?php

namespace App\Controller;

use Rompetomp\InertiaBundle\Service\InertiaInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController as BaseController;

abstract class AbstractController extends BaseController
{
    protected InertiaInterface $inertia;

    public function __construct(InertiaInterface $inertia)
    {
        $this->setInertia($inertia);
    }

    public function setInertia(InertiaInterface $inertia): void
    {
        $this->inertia = $inertia;
    }
}
