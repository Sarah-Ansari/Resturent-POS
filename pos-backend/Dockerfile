FROM openjdk:17-jdk-slim

RUN mkdir site

WORKDIR /site

# copy the pom and src code to the container
COPY ./ ./

RUN chmod +x ./mvnw

RUN sed -i 's/\r$//' mvnw

RUN ./mvnw clean install

RUN ls

CMD ["java", "-jar", "target/toaster-0.0.1-SNAPSHOT.jar"]