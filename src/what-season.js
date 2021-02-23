module.exports = getSeason = date => {
  if (date === undefined) {
    return 'Unable to determine the time of year!'
  }
  if (Date.parse(date) === NaN) {
    throw Error
  }
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const milliseconds = date.getMilliseconds()

  const seasons = {
    winter: {
      start: new Date(`${year}-11-01T00:00:00.000+03:00`),
      end: new Date(`${year + 1}-02-01T00:00:00.000+03:00`),
    },
    spring: {
      start: new Date(`${year}-02-01T00:00:00.000+03:00`),
      end: new Date(`${year}-05-01T00:00:00.000+03:00`),
    },
    summer: {
      start: new Date(`${year}-05-01T00:00:00.000+03:00`),
      end: new Date(`${year}-08-01T00:00:00.000+03:00`),
    },
    fall: {
      start: new Date(`${year}-08-01T00:00:00.000+03:00`),
      end: new Date(`${year}-11-01T00:00:00.000+03:00`),
    },
  }

  if (date - seasons.winter.start >= 0 && seasons.winter.end - date > 0) {
    return 'winter'
  } else if (
    date - seasons.spring.start >= 0 &&
    seasons.spring.end - date > 0
  ) {
    return 'spring'
  } else if (
    date - seasons.summer.start >= 0 &&
    seasons.summer.end - date > 0
  ) {
    return 'summer'
  } else {
    return 'fall'
  }
}

/*
### **Какая пора года??**

Ваша задача — реализовать функцию `getSeason(date)`, которая принимает объект `Date` и возвращает соответствующую ему пору года. Пора года должна быть типа `string`.

---
<details>

<summary>Названия пор года в англиийском языке</summary>
В английском поры года имеют следующие наименования: весна — spring, лето — summer, осень — autumn (fall), зима — winter.

</details>

---

Если аргумент `date` не был передан, функция должна вернуть строку `'Unable to determine the time of year!'` Если аргумент `date` **некорректный**, функция должна выбросить ошибку (`Error`).

Тссс! Среди аргументов, которые попадают в эту функцию, затесался вражеский агент.

![Disguised](https://www.famousbirthdays.com/faces/disguised-toast-image.jpg)

Он руководствуется знаменитой поговоркой: "Если это выглядит как **утка**, плавает как **утка**, и крякает как **утка**, тогда это, скорее всего, **утка** (и неважно, что это **на самом деле**)". Он **искусно маскируется** под настоящую дату (`date`), но умелый javascript-разработчик может поймать его и выбросить ошибку как раз вовремя!

Например:

`const springDate = new Date(2020, 02, 31)`

`getSeason(springDate) => 'spring'`

Напишите ваш код в `src/what-season.js`.

---
*/
