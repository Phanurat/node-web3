# ใช้ base image สำหรับ Node.js
FROM node:16

# ตั้ง working directory ใน container
WORKDIR /usr/src/app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมดจาก host ไปยัง container
COPY . .

# เปิดพอร์ตที่แอปจะรัน
EXPOSE 3000

# คำสั่งเริ่มต้นที่ container จะรัน
CMD ["node", "server.js"]