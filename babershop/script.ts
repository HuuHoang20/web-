class BarberService {
    private services: { name: string; price: string; image: string }[];

    constructor() {
        this.services = [];
    }

    addService(name: string, price: string, image: string) {
        this.services.push({ name, price, image });
    }

    getServices() {
        return this.services;
    }
}

class ContactForm {
    constructor(private formElement: HTMLFormElement) {
        this.init();
    }

    private init() {
        this.formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this.handleSubmit();
        });
    }

    private async handleSubmit() {
        const nameInput = document.getElementById('name') as HTMLInputElement;
        const messageInput = document.getElementById('message') as HTMLTextAreaElement;
        const responseDiv = document.getElementById('response');

        const name = nameInput.value;
        const message = messageInput.value;

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, message }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            if (responseDiv) {
                responseDiv.textContent = `Cảm ơn ${name} đã liên hệ với chúng tôi!`;
            }

            this.formElement.reset();
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            if (responseDiv) {
                responseDiv.textContent = `Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại.`;
            }
        }
    }
}

// Tạo danh sách dịch vụ
const barberService = new BarberService();
barberService.addService('Hớt Tóc', '200,000 VNĐ', 'images/cat_toc.jpg');
barberService.addService('Gội Đầu', '150,000 VNĐ', 'images/goi_dau.jpg');
barberService.addService('Tạo Kiểu', '300,000 VNĐ', 'images/tao_kieu.jpg');
barberService.addService('Cạo Râu', '100,000 VNĐ', 'images/cao_rau.jpg');
barberService.addService('Hấp Tóc', '250,000 VNĐ', 'images/hap_toc.jpg');

// Hiển thị danh sách dịch vụ
const servicesList = document.getElementById('servicesList');
if (servicesList) {
    barberService.getServices().forEach(service => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <h3>${service.name}</h3>
            <img src="${service.image}" alt="${service.name}">
            <p>Giá: ${service.price}</p>
        `;
        servicesList.appendChild(listItem);
    });
}

// Khởi tạo form liên hệ
const contactFormElement = document.getElementById('contactForm') as HTMLFormElement;
if (contactFormElement) {
    new ContactForm(contactFormElement);
}
