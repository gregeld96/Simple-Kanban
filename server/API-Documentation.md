**Fancy Todo**
----
> Kanban App

* **URL**

  >To Login into the app <br />
  `/login`

* **Method:**

  `POST`

* **Data Params**

  **Required:**
 
   `email = [string]`<br />
   `password = [string]`

* **Success Response:**
  
  **Code:** 200 OK <br />
  **Content:** 
    ```json
    {
      "token": [string],
      "msg": "User successfully logined!"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request<br />
    **Content:**
    ```json
      {
        "msg": "email and password required for login"
      }
    ```
    OR
    ```json
      {
        "msg": "Username or Password Invalid"
      }
    ```

<br />

* **URL**

  >To Login into the app qith goggle account <br />
  `/google`

* **Method:**

  `POST`

* **Data Params**

  **Required:**
 
   `id_token = [string]`

* **Success Response:**
  
  **Code:** 200 OK <br />
  **Content:** 
    ```json
    {
      "token": [string],
      "msg": "User successfully logined!"
    }
    ```
 
* **Error Response:**

    * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ msg }`

<br />

* **URL**

  >To register a user <br />
  `/register`

* **Method:**

  `POST`

* **Data Params**

  **Required:**
 
   `name = [string]`<br />
   `email = [string]`<br />
   `password = [string]`

* **Success Response:**
  
  **Code:** 201 Created <br />
  **Content:** 
    ```json
    {
      "name": [register.name],
      "msg": [register.name] "successfully registered!"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request<br />
    **Content:**
    ```json
      {
        "msg": "Name cannot be empty,Email cannot be empty,Please use the right email format,Password cannot be empty"
      }

      OR

      {
        "msg": "Email already exist!"
      }
    ```

<br />

* **URL**

  > To get all the user list <br />
  `/`

* **Method:**

  `GET`

* **Request Header:**

  ```json
    {
      "access_token": < user token >
    }
    ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    [
        {
          "id": [integer],
          "title": [string],
          "email": [string],
          "password": [string],
          "organization": [string],
          "createdAt": [date],
          "updatedAt": [date]
        }
    ]
    ```
 
* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
      "msg": "token invalid!"
    }
    ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ msg }`

<br />

* **URL**

  > To get all the task list <br />
  `/tasks`

* **Method:**

  `GET`

* **Request Header:**

  ```json
    {
      "access_token": < user token >
    }
    ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
      "todos": [
        {
          "id": [integer],
          "title": [string],
          "userId": [string],
          "categoryId": [string],
          "createdAt": [date],
          "updatedAt": [date]
        }
      ]
    }
    ```
 
* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
      "msg": "token invalid!"
    }
    ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ msg }`

<br />

* **URL**

  > To add a task <br />
  `/tasks/add`

* **Method:**

  `POST`

* **Request Header:**

  ```json
    {
      "access_token": < user token >
    }
    ```

* **Data Params**

  **Required:**
 
   `title = [string]`

* **Success Response:**
  
  **Code:** 201 Created <br />
  **Content:** 
    ```json
    {
      "data": [
        {
          "id": [integer],
          "title": [string],
          "userId": [string],
          "categoryId": [string],
          "createdAt": [date],
          "updatedAt": [date]
        }
      ]
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
      "msg": "Please fill up the title/description of task"
    }

    OR

    {
      "msg": "token invalid!"
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ msg }`

<br />

* **URL**

  >To update the specific task <br />
  `/tasks/:id`

* **Method:**

  `PUT`

*  **URL Params** 

   **Required:**
 
   `id=[integer]`

* **Request Header:**

  ```json
    {
      "access_token": < user token >
    }
  ```

* **Data Params**

  **Required:**
 
   `title: [string]` <br/ >
   `categoryId: [integer]`

* **Success Response:**
  
  **Code:** 200 OK <br />
  **Content:** 
    ```json
    {
      "task": {
        "id": [integer],
        "title": [string],
        "categoryId": [integer],
        "userId": [integer]
      }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
      "msg": "Please fill up the title/description of task"
    }

    OR

    {
      "msg": "token invalid!"
    }
    ```

  OR

  * **Code:** 403 Forbidden<br />
    **Content:**
    ```json
      {
        "msg": "You are not Authorized!"
      }
    ```

  OR
  
  * **Code:** 404 Not Found<br />
    **Content:**
    ```json
      {
        "msg": "Data not found"
      }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ msg }`

<br />

* **URL**

  >To delete the specific task <br />
  `/tasks/:id`

* **Method:**

  `DELETE`

*  **URL Params** 

   **Required:**
 
   `id=[integer]`

* **Request Header:**

  ```json
    {
      "access_token": < user token >
    }
    ```

* **Success Response:**
  
  **Code:** 200 OK <br />
  **Content:** 
    ```json
    {
      "msg": "Task successful deleted"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request<br />
    **Content:**
    ```json
      {
        "msg": "token invalid!"
      }
    ```
    
  * **Code:** 403 Forbidden<br />
    **Content:**
    ```json
      {
        "msg": "You are not Authorized!"
      }
    ```

  OR

  * **Code:** 404 Not Found<br />
    **Content:**
    ```json
      {
        "msg": "Data not found"
      }
    ```
  
  OR
  
  * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ msg }`

<br />

* **URL**

  > To get all the category <br />
  `/categories`

* **Method:**

  `GET`

* **Request Header:**

  ```json
    {
      "access_token": < user token >
    }
    ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
   [
        {
          "id": [integer],
          "name": [string],
          "createdAt": [date],
          "updatedAt": [date]
        }
    ]

    ```
 
* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
      "msg": "token invalid!"
    }
    ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ msg }`

<br />

* **URL**

  > To add a category <br />
  `/categories/add`

* **Method:**

  `POST`

* **Request Header:**

  ```json
    {
      "access_token": < user token >
    }
    ```

* **Data Params**

  **Required:**
 
   `name = [string]`

* **Success Response:**
  
  **Code:** 201 Created <br />
  **Content:** 
    ```json
    {
      "data": [
        {
          "id": [integer],
          "name": [string],
          "createdAt": [date],
          "updatedAt": [date]
        }
      ]
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
      "msg": "Please fill up the title/description of task"
    }

    OR

    {
      "msg": "token invalid!"
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ msg }`