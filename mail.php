<?

if( isset($_POST['form-type']) ) {
    $to       = "anton.kurbatov.59@gmail.com, iskhakovaanzhela@gmail.com, kolotyginvladislav@gmail.com"; //Почта получателя
    // $to       = "staremang@ya.ru"; //Почта получателя (developer)
    $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
    $headers .= "From: Колизей <mail@koliseum-perm.ru>\r\n"; //Наименование и почта отправителя



    // call-me - Позвоните мне
    //  * name
    //  * tel
    // gift - Пригласить друзей
    //  * name
    //  * tel
    // guest-visit-form - Гостевой визит
    //  * name
    //  * tel
    //  * time
    // interview - опрос
    //  * old-or-new
    //  * how-many-guests
    //  * period
    //  * time
    //  * name
    //  * tel
    //  * email

    
    if ($_POST['form-type'] == "call-me") {

        if ((isset($_POST['name']) && $_POST['name'] != "") && (isset($_POST['tel']) && $_POST['tel'] != "")) {

            $subject = 'Позвоните мне!';
            $message = '<table>
                            <tr>
                                <td>Имя:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['name']))).'</td>
                            </tr>
                            <tr>
                                <td>Телефон:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['tel']))).'</td>
                            </tr>
                        </table>';

            mail($to, $subject, getBody($subject, $message), $headers);
            echo json_encode(array('sended'=>true,'message'=>''));
        } else {
            echo json_encode(array('sended'=>false,'message'=>'Не все поля заполнены'));
        }

    } elseif ($_POST['form-type'] == "gift") {

        if ((isset($_POST['name']) && $_POST['name'] != "") && (isset($_POST['tel']) && $_POST['tel'] != "") && (isset($_POST['parentName']) && $_POST['parentName'] != "")) {


            $subject = 'Приглашение для друга';
            $message = '<table>
                            <tr>
                                <td>Имя пригласившего:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['parentName']))).'</td>
                            </tr>
                            <tr>
                                <td>Имя друга:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['name']))).'</td>
                            </tr>
                            <tr>
                                <td>Телефон друга:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['tel']))).'</td>
                            </tr>
                        </table>';
            
            mail($to, $subject, getBody($subject, $message), $headers);
            echo json_encode(array('sended'=>true,'message'=>''));
        } else {
            echo json_encode(array('sended'=>false,'message'=>'Не все поля заполнены'));
        }

    } elseif ($_POST['form-type'] == "guest-visit-form") {
        if ((isset($_POST['name']) && $_POST['name'] != "") && (isset($_POST['tel']) && $_POST['tel'] != "") && (isset($_POST['date']) && $_POST['date'] != "")) {


            $subject = 'Заявка на гостевой визит';
            $message = '<table>
                            <tr>
                                <td>Имя гостя: </td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['name']))).'</td>
                            </tr>
                            <tr>
                                <td>Телефон гостя:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['tel']))).'</td>
                            </tr>
                            <tr>
                                <td>Время посещения:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['date']))).'</td>
                            </tr>
                        </table>';
            
            mail($to, $subject, getBody($subject, $message), $headers);
            echo json_encode(array('sended'=>true,'message'=>''));
        } else {
            echo json_encode(array('sended'=>false,'message'=>'Не все поля заполнены'));
        }

    } elseif ($_POST['form-type'] == "interview") {

        if (
            (isset($_POST['name']) && $_POST['name'] != "") && 
            (isset($_POST['tel']) && $_POST['tel'] != "") && 
            (isset($_POST['email']) && $_POST['email'] != "") && 
            (isset($_POST['time']) && $_POST['time'] != "") && 
            (isset($_POST['period']) && $_POST['period'] != "") &&
            (isset($_POST['old-or-new']) && $_POST['old-or-new'] != "") &&
            (isset($_POST['how-many-guests']) && $_POST['how-many-guests'] != "")
            ) {

            $subject = 'Заявка по сбору карты';
            $directions = $_POST['directions'];

            $chmsg = '';
            if (!empty($directions)) {
                $chmsg = '<ul>';

                foreach($_POST['directions'] as $chkval) {
                    $chmsg .= '<li>';
                    $chmsg .= trim(urldecode(htmlspecialchars($chkval)));
                    $chmsg .= '</li>';
                }

                $chmsg .= '</ul>';
            } else {
                $chmsg = 'Не выбран ни один вариант';
            }
            $message = '<h4>Контакты гостя</h4>
                        <table>
                            <tr>
                                <td>Имя гостя: </td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['name']))).'</td>
                            </tr>
                            <tr>
                                <td>Телефон гостя:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['tel']))).'</td>
                            </tr>
                            <tr>
                                <td>E-mail:</td>
                                <td><a href="mailto:'.trim(urldecode(htmlspecialchars($_POST['email']))).'">'.trim(urldecode(htmlspecialchars($_POST['email']))).'</a></td>
                            </tr>
                        </table>
                        <h4>Ответы на вопросы:</h4>
                        <table>
                            <tr>
                                <td>Старый или новый гость:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['old-or-new']))).'</td>
                            </tr>
                            <tr>
                                <td>Буду посещать:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['how-many-guests']))).'</td>
                            </tr>
                            <tr>
                                <td>Срок:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['period']))).' месяцев</td>
                            </tr>
                            <tr>
                                <td>Удобное время для занятий:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['time']))).'</td>
                            </tr>
                            <tr>
                                <td>Интересующие направления:</td>
                                <td>'.$chmsg.'</td>
                            </tr>
                        </table>';
            
            mail($to, $subject, getBody($subject, $message), $headers);
            echo json_encode(array('sended'=>true,'message'=>''));
        } else {
            echo json_encode(array('sended'=>false,'message'=>'Не все поля заполнены'));
        }
    } else {
        echo json_encode(array('sended'=>false,'message'=>'Не указан тип формы'));
    }
}



function getBody ($title, $body) {
    return '<html>
                <head>
                    <title>'.$title.'</title>
                    <style>
                        table {
                            border-collapse: collapse;
                            border-spacing: 0;
                        }
                        table, td {
                            border: solid 1px black;
                        }
                        td {
                            padding: 3px;
                        }
                        ul {
                            padding-left: 15px;
                            margin: 0;
                        }
                    </style>
                </head>
                <body>
                    '.$body.'
                </body>
            </html>';
}
?>