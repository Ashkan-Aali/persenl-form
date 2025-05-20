const form = document.getElementById("form");
const nameInput = document.getElementById("nameInput");
const familyInput = document.getElementById("familyInput");
const emailInput = document.getElementById("emailInput");
const jobInput = document.getElementById("jobInput");
const numberInput = document.getElementById("numberInput");
const genderInput = document.getElementById("gender");
const showModalBtn = document.getElementById("showModal");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");

let pepole = [];
// add person
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const newPerson = {
        name: nameInput.value.trim(),
        family: familyInput.value.trim(),
        email: emailInput.value.trim(),
        job: jobInput.value.trim(),
        phone: numberInput.value.trim(),
        gender: genderInput.value
    }
    if (!newPerson.phone || !newPerson.family || !newPerson.name) {
        nameInput.classList.add("my-input");
        numberInput.classList.add("my-input");
        familyInput.classList.add("my-input");
        alert("لطفا فیلدهای الزامی را پر کنید");
        return;
    }
    pepole.push(newPerson);
    form.reset();
})

// show pepole
showModalBtn.addEventListener("click", () => {
    if (pepole.length == 0) {
        modal.innerHTML = `<h3> کاربری وجود ندارد </h3>`;
    } else {
        modal.innerHTML = `<h3> لیست کاربران: </h3>`;
        const list = document.createElement("ul");

        pepole.forEach((person, index) => {

            const {
                name,
                family,
                email,
                job,
                phone,
                gender
            } = person;

            const li = document.createElement("li");
            li.innerText = `${index + 1} . ${name} ${family}
             ایمیل: ${email} 
             شغل: ${job || '---'} 
             تلفن: ${phone || '---'} 
             جنسیت: ${gender || '---'}`;
            list.appendChild(li);
        })
        modal.appendChild(list);
    }

    handleShowModal();

})


// find person with email
document.getElementById("findEmial").addEventListener("click", () => {
    const emailToFind = prompt("ایمیل مورد نظر را وارد کنید");
    const person = pepole.filter(p => p.email === emailToFind.trim());
    if (person.length > 0) {
        modal.innerHTML =
            `<h3> کاربر با مشخصات زیر یافت شد : </h3> `;
        person.forEach((person) => {
            const {
                name,
                family,
                email,
                job,
                phone,
                gender
            } = person;
            modal.innerHTML += `
            <hr>
            <p>نام : ${name} </p>
            <p>نام خانوادگی : ${family} </p>
            <p>شغل : ${job} </p>
            <p>شماره تماس : ${phone} </p>
            <p>جنسیت : ${gender}</p>`;
        })
    } else {
        modal.innerHTML = `<h3> کاربر یافت نشد </h3>`
    }
    handleShowModal();

})

//check all have Job
document.getElementById("checkAllHaveJob").addEventListener("click", () => {
    const haveJob = pepole.every(p => p.job.trim())
    modal.innerHTML = haveJob ?
        "<p>✅ همه افراد دارای شغل هستند.</p>" :
        "<p>❌ برخی افراد شغل ثبت نکرده‌اند.</p>";
    handleShowModal();

})

//check have man
document.getElementById("checkHasMale").addEventListener("click", () => {
    const hasMale = pepole.some(p => p.gender === "مرد")
    modal.innerHTML = hasMale ?
        "<p>✅  حداقل یک مرد ثبت شده است .</p>" :
        "<p>❌ در بین افراد مردی وجود ندارد .</p>";
    handleShowModal();
})

// function show modal
const handleShowModal = () => {
    overlay.style.opacity = "1";
    overlay.style.visibility = "visible";
    modal.style.opacity = "1";
    modal.style.visibility = "visible";
}

// close overlay page
overlay.addEventListener("click", () => {
    overlay.style.opacity = "0";
    overlay.style.visibility = "hidden";
    modal.style.opacity = "0";
    modal.style.visibility = "hidden";
})