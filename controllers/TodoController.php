<?php

namespace app\controllers;

use yii\rest\ActiveController;
use yii\web\ServerErrorHttpException;

/**
 * TodoController implements the CRUD actions for Todo model.
 */
class TodoController extends ActiveController
{
    public $modelClass = 'app\models\Todo';

    /**
     * {@inheritdoc}
     */
    protected function verbs()
    {
        return array_merge(parent::verbs(),
            ['deletes' => ['DELETE'],]
        );
    }


    public function actionDeletes() {
        $ids = \Yii::$app->request->post();
        $modelClass = $this->modelClass;
        foreach($ids as $id) {
            $model = $modelClass::findOne(array('id' => $id));
            $this->checkAccess($id, $model);

            if ($model->delete() === false) {
                throw new ServerErrorHttpException('Failed to delete the object for unknown reason.');
            }

            \Yii::$app->getResponse()->setStatusCode(204);

        }
    }

}
