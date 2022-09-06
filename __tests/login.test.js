/*
1. Получает в качестве аргумента:  запрос пользователя, где переданы данные логина (email) и пароля.
2. Схема которая валидирует логин и пароль имеет такие 
    для логина допустимые значения: example@mail.com, Example2@mail.com, exa#p!e@mail2.com
    для логина НЕ допустимые значения: ex@mple@mail.com, Example2@mail2.com2
    для пароля критериии: минимум 8 символов латиницы в верхнем и нижнем регистре, любые целые числа, спец символы #?!@$%^&*-
   
3. Обращается к БД с поиском по email, который получили в запросе.
   Если такого email в БД нет, то получаем ответ сервера ошибку с кодом 401 и сообщением "Email not found". 
3. Проверяем пароль на соответствие тому, который вводил пользователь при регистрации.
   Если пароль не совпадает, то получаем ответ сервера с ошибку кодом 401 и сообщением "Password wrong".
4. При успешном логине и пароле генерируем токен и в ответе от сервера получаем статус-код 200,
   токен и объект user с 2 полями email и subscription, имеющие тип данных String

=========================
req.body = {   
    "email": "av2atar2272@mail2.com",
    "password":"qw2@EEEe"   
}

OK Status 200

"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTc1OTAxYjMxNmNlMmE2MThhMTJlMSIsImlhdCI6MTY2MjQ5MzY2MCwiZXhwIjoxNjYyNTgwMDYwfQ.xU8U2biF283hyf5aUAW_oAS7qASHiPqxcIMY0GM3pMM",
"user": {
        "email": "avatar2222@mail.com",
        "subscription": "starter"
        }

=========================
req.body = {   
    "email": "Example2@mail2.com2",
   "password":"qw2@EEEe"   
}

status code 400 "Wrong format! Should be like a mail schema: example@mail.com"
  
======================== 
req.body = {   
    "email": "Example2@mail2.com2",
   "password":"qwe"   
}  

status code 400 "Wrong format! Should be minimum eight characters, at least one letter, one number and one special character @$!%*#?&"

=======================
req.body = {}

status code 400 "message": "\"email\" is required"

=======================
req.body = {"email": "Example2@mail2.com2"} 

status code 400 "message": "\"password\" is required"

=======================
req.body = {  
   gdfsgsdfhdsfhsd   
}

status code 400 "message": "Unexpected token g in JSON at position 12"

*/
