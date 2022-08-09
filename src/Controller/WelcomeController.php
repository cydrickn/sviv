<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Kernel;
use Symfony\Component\Routing\Annotation\Route;

class WelcomeController extends AbstractController
{
    #[Route('/', name: 'welcome', methods: ['GET'])]
    public function welcome(): Response
    {
        $version = Kernel::VERSION;
        $projectDir = $this->getParameter('kernel.project_dir') . DIRECTORY_SEPARATOR;
        $docVersion = substr(Kernel::VERSION, 0, 3);

        return $this->inertia->render('welcome', [
            'version' => $version,
            'projectDir' => $projectDir,
            'docVersion' => $docVersion,
        ]);
    }
}
