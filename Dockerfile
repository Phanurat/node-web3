# ใช้ base image สำหรับ Node.js
FROM node:16

# ตั้ง working directory ใน container
WORKDIR /usr/src/app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm ci

# คัดลอกโค้ดทั้งหมดจาก host ไปยัง container
COPY . .

# เปิดพอร์ตที่แอปจะรัน
EXPOSE 3000

# คำสั่งเริ่มต้นที่ container จะรัน
RUN apt-get update && apt-get install -y wait-for-it
CMD ["wait-for-it", "db:3306", "--", "node", "server.js"]
