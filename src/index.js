import './index.css';

import {getUsers, deleteUser} from './api/userApi';

// populate table of users via api call
getUsers().then(result => {
  let usersBody = "";

  result.forEach(user => {
    usersBody += `<tr>
      <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
      <td>${user.id}</td>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.email}</td>
      </tr>`
  });

  global.document.getElementById('users').innerHTML = usersBody;

  // get ref to all delete links on page
  const deleteLinks = global.document.getElementsByClassName('deleteUser');

  // must use array.from to create real array from a dom clln
  // getElementsByClassname only returns "array like" obj
  Array.from(deleteLinks, link => {
    link.onclick = event => { // attach click handler to each delete link
      const element = event.target;
      event.preventDefault();        // attach click handler to each delete link
      deleteUser(element.attributes["data-id"].value); // call deleteUser()
      const row = element.parentNode.parentNode;
      row.parentNode.removeChild(row);                 // remove row from dom
    };
  });
});
