---
title: "Understanding Microservices Architecture: A Deep Dive Beyond the Basics"
publishDate: 2023-1-29
description: "Why execution time is a poor way to measure an algorithm, and how Big O notation describes efficiency through the growth of operations instead."
tags: [ microservices, architecture ]
coverImage:
  src: ./_assets/understanding-microservices/cover.png
  alt: "Glowing orange rings around the words 'Big O notation' on a dark circuit-board background."
---

Microservices architecture has become one of the most popular and widely used software architecture designs in recent years and for very good reasons. It provides efficient code modularization, fast deployments, easier testings and so much more, which are already huge points against traditional architecture designs.

But do you really understand how everything works under the hood? And more importantly, do you know when you should or should not use this design? What are the pros and cons? How to design your own? What are the best practices you should be aware of? What steps to take when migrating to it? This is what this article is about.

## 1. What are they?

The first appearances of the term "microservices" as we know was around the year of 2011 in popular software workshops. It became a popular jargon to referring to a new architecture design of decentralized services. However, it was only in 2014 that the term really received a solid definition with the [article published by Martin Fowler and James Lewis](https://martinfowler.com/articles/microservices.html), which fully describes how this new architecture functions in the real world. Until this day, this article is still a great resource for a concise understanding about the essence of the microservices architecture.

In short, the microservice architectural style is an approach to developing a single application as a suite of small services, each running in its own process and communicating with lightweight mechanisms, often an HTTP resource API. These services are built around business capabilities and independently deployable by fully automated deployment machinery. There is a bare minimum of centralized management of these services, which may be written in different programming languages and use different data storage technologies.

<figure>
  <img style="width: auto" src="/assets/understanding-microservices/ecommerce-example.png" alt="Example of microservices on an e-commerce application context" />
  <figcaption>Example of microservices on an e-commerce application context</figcaption>
</figure>

I highly recommend that you read the article entirely yourself for a complete and concise understanding of the most fundamental concepts of what we know as microservices architecture. If in a hurry, however, the main ideas of the article are summarized in the following subsections.

### 1.1. Componentization Via Services

A component is defined as a unit of software that is independently replaceable and upgradeable. In this sense, Microservices Architecture's aim is to make each component its own separate and out-of-process service that operates independently and interact with the out-world through well-defined interfaces (usually Web APIs). This provides numerous benefits such as separate deployments, easier testings and better component interfaces.

### 1.2. Organized Around Business Capabilities

Usually, software teams are organized around business responsibilities e.g. database team, back-end team, front-end team, etc. and thus the communication is also mostly restricted within each team. Following this scenario, when working with monoliths, communication and goal-alignment between teams can easily become messy and cumbersome as each of them is focused only on its own business responsibilities. With microservices, the idea is that each service is handled by a cross-functional team that has different technical people but with a common goal, which is delivering the service in its best way possible. This provides a more organized and concise development process as well as well-defined boundaries around each feature design.

### 1.3. Products not Projects

Microservices must be product-focused instead of project-focused. This means that the overall goal is not delivering a working code, but a working product and be responsible for that product as long as in production. This is inspired by the Amazon's famous concept of "you build it, you runt it". This also implies more responsibilities such as stronger relation with the client and longer maintenance periods.

### 1.4. Smart Endpoints and Dumb Pipes

One of the biggest mistakes in some architecture designs is to stress putting so much smartness on the communication mechanism. Take the SOA architecture as an example, which make its overall environment much complex with the use of ESBs and WS-* protocol as communication patterns that the result is sometimes something even more complex than a normal monolith. Microservices, however, aim to be the exact opposite. While each service is to have a well-defined and robust interface for external communication, the pipe flow itself is aimed to be the simplest possible, that usually being Rest APIs over HTTP web protocol. Another common approach is to make use of a lightweight message bus, such as RabbitMQ or AWS SQS, which offer nothing more than asynchronous message delivering to the services. In any case, the smartness itself always lives at the end point, in the services.

### 1.5. Decentralized Governance

In traditional projects, there are usually standards for everything, database, logging, technologies, etc. This narrows down any space for optimal decisions in products that require different standards than the ones defined, sometimes preventing them from running with the performance they could. With microservices, each service is fully responsible for their own implementation details. This way, it's up to them to define their own standards with whatever technology makes sense for them. The idea here is that you can use whatever tools are available when building a service as long as you keep following the defined communication contracts with other components. This multi technology platform defines what is sometimes called a polyglot software. Of course, just because you can do something, doesn't mean you should, sometimes it makes more sense to stick with the same standards and not reinvent the wheel needlessly.

### 1.6. Decentralized Data Management

Usually, traditional projects will have a single database, which is shared between all its inner components. Microservices design prefers letting each service manage its own database, either different instances of the same database technology, or entirely different database systems. This, however, is a very controversial topic and might not always be the best solution. It can bring huge consequences such as data duplication and distributed transactions management, which can make the overall project more complex than a monolith itself. While in some scenarios the service data is very independent and can be isolated without much problems, in other cases it might be part of the project context bound and always be correlated with data of different services. In this last case, separate databases could increase latency and external services dependency and not bring any benefit whatsoever. So always consider the trade-offs of each option and choose the one that makes more sense for your scenario.

### 1.7. Infrastructure Automation

Automation tools are essential for microservices architecture once it would be too complex to be handling deployment and testing of every service manually. One of the reasons the SOA architecture design didn't work for so long in real world was the lack of tooling for automation at the time. For this reason, microservice teams are usually very experienced in Continuous Integration and Continuous Delivery (CI/CD), which has the modest aim of making deployment a boring task by making it completely automated. Automated tests are another aspect of it, once it's crucial to have as much confidence as possible that every service is up and running as expected without effort.

### 1.8. Design for Failure

A consequence of using services as components, is that applications need to be designed so that they can tolerate the failure of services. Having so many different networking and processes working together also means that there is space for a lot to go wrong. For this reason, awareness that failures can, and most probably will, happen is crucial. The team has to be prepared in advance for these scenarios and they must handle it gracefully, once a single service down can affect others and possibly even the end user. It's also important to have integrated monitor platform that keeps checking for the service health and possible errors and notifies the developers about them as soon as encountered. For these issues, logging and monitoring will always be your greatest tools.

### 1.9. Evolutionary Design

Whenever you try to break a monolith system into service components, you're faced with the decision of how to divide up the pieces. The key property of a component is the notion of independent replacement and upgradeability, always keep this in mind when designing a microservice architecture. In the world of microservices, practitioners leverage an evolutionary design, this implies that migration from a monolith to a microservice architecture must be done gradually, avoiding system crashing and poor services designs.

## 2. Why microservices? The problems with traditional architectures

Before diving even deeper into microservices, it's important to understand a little bit of the history behind its invention. What was the urge for this design to even be created in the first place? Well, in summary, it was an attempt of dealing with some of the common headaches caused by traditional architecture designs, namely Monolith and Service-Oriented Architecture (SOA).

### 2.1. Monolith

I believe everyone is somehow familiar with this design once it is basically the natural way everything will evolve if not planned differently from the very start. In monoliths, everything in the project runs together in one single process. What this means is that there's no effective separation between components and everything is tightly coupled. This can easily result in large and complex codebases with no clear separation of business context.

<figure>
  <img style="width: auto" src="/assets/understanding-microservices/monolith-example.png" alt="Example of monolith on an e-commerce context" />
  <figcaption>Example of monolith on an e-commerce context</figcaption>
</figure>

#### Problems

- **Same technologies** - In monoliths, all components of the project are built using the same technologies (programming languages, frameworks, etc), which might not be the best suit for every component's needs.
- **Harder to scale** - Monoliths are usually harder to scale since you can not distribute your resources efficiently among your components.
- **If anything fails, everything fails** - Because of its strong coupling, components are very dependent on each other, which might cause the whole system to crash if a single component does not work properly.
- **More bugs** - It's easier to generate bugs in a scenario where all components are so strongly connected. It is not rare that you fix an issue on a single component and it ends up generating another issue on another, sometimes unrelated, component.
- **Developers must know more** - Another bad consequence of strong coupling is that developers will probably feel that they have to get a broad view of the project (which might be huge) to be secure on doing great code changes. Since it is easier to generate bugs across components, it also gets much harder to maintain it and sometimes certain changes are even discouraged by developers.
- **Large and complex codebase** - This is true for almost every monolith. Since every component logic is written on the same project context, it gets very easy for the codebase to get complex and messy as time goes by, if not carefully managed.
- **Harder to test** - Yet another consequence of strong coupling. Once there is usually not a clear separation of components, it gets harder to isolate functionalities and therefore test them individually, which might lead to continuous testing mistakes or even to decisions of not writing tests for the project at all.
- **Inefficient deploys** - Once everything runs in the same process, if a single line of code is changed, the whole project has to be deployed again, which might take a long time, depending on how it is managed. This makes the whole process very inefficient, usually making updates to be postponed by developers, which results in low frequency updates to the system.

### 2.2. SOA

Introduced in 1998, it was a very innovative architecture design at the time, aiming to solve some of the common problems found in monoliths. It makes use of a distributed system design and loosely coupled components to create a more heterogeneous ecosystem with separate oriented components. Each service exposes metadata that defines its functionalities to enable better communication.

SOA commonly makes use of Enterprise Service Bus (ESB) where all communication between services are centered. ESB acts as a central hub for routing, transforming, and orchestrating messages between different services, promoting interoperability and flexibility to the architecture. SOA usually uses standard communication patterns to operate, such as SOAP and WSDL.

<figure>
  <img style="width: auto" src="/assets/understanding-microservices/soa-example.png" alt="Example of SOA on an e-commerce context" />
  <figcaption>Example of SOA on an e-commerce context</figcaption>
</figure>

I know this one might be little harder to understand, so I'll leave [this video here](https://www.youtube.com/watch?v=_dFJOSR-aFs) where i think everything is explained concisely well. You might even think that this works the same as the microservice architecture (it doesn't) so I'll also leave [this video here](https://www.youtube.com/watch?v=EpyPFnjue38) where the differences between the two are summarized in simple terms.

#### Problems

- **ESBs are hard to maintain** - ESBs are very hard to maintain. They are usually responsible for routing, transformation, and message orchestration. This complexity can make ESBs challenging to maintain, as updates or changes may have unintended consequences on the entire service infrastructure.
- **Single point of communication and potential bugs** - ESBs provide a single point of communication between services, which, while facilitating integration, can also become a single point of failure. If the ESB experiences issues or bugs, it can impact all the services relying on it, potentially leading to widespread service disruptions.
- **Performance issues** - The use of XML-based protocols like SOAP can lead to performance overhead, slowing down interactions between services.
- **Not so practical nowadays** - The use of SOAP and WSDL protocols, which are commonly used in SOA, makes it very obsolete. With the whole software industry using primarily the simple JSON format over HTTP protocol nowadays, the use of a more complex pattern certainly discourages developers to adhere to it.

## 3. How do microservices tackle these problems?

Regarding monoliths, you might have noticed that most of its problems comes from the fact that its components are tightly coupled. So how are these problems solved in the microservices architecture design?

- **Same technologies (solved)** - In microservices, you are free to choose whichever technology suits best the needs of each of your microservices. For the outside world, it doesn't matter how you solve the problem as long as you expose a good interface for interaction.
- **Harder to scale (solved)** - In microservices, you are free to scale only the services you need, allowing you to efficiently distribute your compute resources among your applications.
- **If anything fails, everything fails (solved)** - Of course, if a service fails it might also carry out some other services that depends on it. However, not the entire application will go down, as with monoliths, and sometimes the absence of some services might not even be noticeable by the end user.
- **More bugs (highly improved)** - Of course, bugs will still exist in microservices architecture and interaction between components will always be a point of concern and to be watched. However, it's much harder to break unrelated components when working with microservices.
- **Developers must know more (solved)** - Microservices absolutely nail it. You can insert new people to work on specific services and they will be able to have a broad view of the service in a short time, since the service boundaries are considerably smaller compared to monoliths. This also reduces the risk of more bugs being generated unintentionally.
- **Large and complex codebase (solved)** - If well designed, services will have a very limited boundary in which they do their job and do it very efficiently. Services might be task-focused or component-focused, regardless of your choice it will surely still be much smaller and less complex than a traditional monolith.
- **Harder to test (solved)** - Testing is a much easier and organized process when you have loosely coupled components, as it's the case with microservices. Of course, this also depends on how you decide to structure your code, but, in general, microservices are significantly easier to be tested.
- **Inefficient deploys (solved)** - This is by far one of the biggest advantages of the microservices architecture. You can easily automate the deployment process of each service using one of the many automation tools available nowadays. And of course, you don't need to deploy the whole project just because a single component has been changed. You deploy only what needs to be deployed.

And what about the problems of SOA architecture? You might have also noticed that most of the problems with this design comes from the fact that it puts so much stress on the communication mechanism, which leads to a much more complex environment. So here is how microservices overcome these issues.

- **ESBs are hard to maintain (solved)** - As mentioned previously, ESBs are very hard to maintain, since they aim to be a centralized component that handles all communication. With microservices, this concept simply doesn't exist once their communication is done directly between them or the client and do not require any central orchestration.
- **Single point of communication and potential bugs (solved)** - This is very related to the previous issue, which is having a central orchestration service. Microservices just don't deal with it, so it's very unlikely that it will have a single point for bugs once communication is direct and components are loosely coupled.
- **Performance (solved)** - As mentioned, the greatest error in SOA architecture was to put to much smartness on communication mechanisms. In microservices, the communication flow is the simplest possible i.e. HTTP request over REST APIs or sometimes, when working asynchronously, the use of queues and event managers.

## 4. When not to use them

After everything discussed so far, you might think that microservices are the solution for all your problems and everyone should use this design in every project. This is not true. Microservices architecture has indeed shown itself as a great alternative to traditional designs and most companies that choose to go with it seem to be going good so far. It does not mean, however, that this design in the best option for every scenario, there are plenty of cases where a simple monolith architecture might be the best option for you.

- **Small systems** - Systems with low complexity should have no reason at all for migrating to a microservices architecture. Keep in mind that microservices design do add a lot of complexity to your overall environment. So if your project is not complex in any sense, you should definitely avoid it. Monoliths would serve you just perfectly in this case.
- **Intermingled functionality or data** - If your components are highly dependent on each other and you just don't see how they can operate separately, it might not be a clever idea to use a microservices architecture. Remember that communication between microservices happens via network, so if your services have heavy external dependencies for every functionality it serves, it will certainly cause a lot more latency. It can also end up generating messy communication webs, where you can't have a clear view of the information exchange in your environment.
- **Performance sensitive systems** - If your system needs to perform very fast and can not tolerate any request delays, think twice. Remember that a lot of extra communication will happen in a microservices architecture, which will certainly add to the overall network latency.
- **Quick and dirty systems** - If you need a system right now or if you do not plan to invest time in organizing it, do not use microservices. It requires a lot of extra time for designing a good working architecture, so don't try it unless you have it.
- **No planned updates** - If you know that your system will not be updated frequently, don't go with it, it will have almost no benefits for you. Microservices' great strength is the fact that it significantly reduces the development time, so if your system is not going to be receiving recurring updates, you have no reason at all for implementing them.

## 5. Steps to design a good Microservice Architecture

Now that you know what really is the microservices architecture and what to consider before going with it, what are the steps to take when starting to build your own? There are four steps to keep in mind whenever you are in the process of designing your architecture environment.

### 5.1. Mapping components

This is the most important step in the whole process, it will shape the whole system and dictate how the project will behave in the long run. It consists of defining the different components of the system, which will then become independent services, as well as what functionalities each of them will be responsible for. The definition of a component should be based on:

- **Business Requirements:** The collection of requirements of an specific business functionality.
  *Example:* An Orders Management, which is responsible for adding, removing and updating orders, could potentially be an independent component, once its boundaries are well defined by its requirements.
- **Functional Autonomy:** This refers to the ability of a component to operate independently and perform its intended functions without relying on other business requirements.
  *Example:* An Orders Management component can return the orders of the last week, but should not be responsible for returning the total orders made by users of age 25–35, since this is clearly involves data not related to orders. Keep in mind though, that this requirement is not always easy to follow as some functionalities really need to reach out for other components to be performed, so it's important to analyze your own scenario and decide what makes sense for you based on your components and your goals.
- **Data Entities:** Services should be designed around well-defined data entities, such as Orders, Products, Customers, etc. Data entities of different services can and most certainly will have relations, but they must be done solely with the use of foreign keys.
  *Example:* An Orders component should not hold too much information about the customer on its own context but instead hold a foreign key pointing to a customer resource on the customer context.
- **Data Autonomy:** Data entities must be atomic i.e. the services must not depend on data from other services to function properly.
  *Example:* A Customer Service which depends on an Address Service for every functionality it serves. In this case, it is much better to unite the Address Service with the Customer Service, since they will never operate independently.

### 5.2. Defining communication patterns

This step defines how the services will communicate with each other. It's crucial to choose the correct communication pattern, since it dictates how interaction between components will happen and can lead to dreadful problems if badly chosen, such as performance issues or difficult error handling. Once defined and applied, this process is very hard to change, so think carefully. The most common patterns are described bellow.

#### 1-to-1 sync

In this pattern, a service calls another service and waits for its response. It should be used only when a service depends on a second service's response to finish own task and provide its own response.

**Example:** An Orders Service needs to consult an Inventory Service to check if the item being purchased is still in stock. The process on the Orders Service fully depends on the Inventory Service's response.

- **Pros:** Immediate response; easier error handling; easy to implement.
- **Cons:** Can lead to performance issues; can become messy easily.

> **Note:** It's important to note that direct communication between services is not recommended, since it can lead to messy interactions and create spider webs, which will have a cascade effect in case one of the services is moved or has some of its exposed functionalities is changed. This means that static locations should never be directly referenced in code. 1-to-1 sync communication should always be done using intermediate gateways or a third party discovery service.

#### 1-to-1 async

In this pattern, a service calls another service but does not wait for its response to continue operating. This flow is also known as fire and forget. It is done when a service needs to pass a message to a second service, but the second service must handle it entirely on its own, so the first service does not need to wait for its response.

**Example:** An Orders Service needs to notify a Payments Service that an order has been placed. The Payments Service must handle the payment processing entirely and separately and therefore the Orders Service does not need to wait for any response.

- **Pros:** Performance, since it will never wait for any response.
- **Cons:** Needs more setup (usually third party applications are involved, such as message queues); Harder error handling (needs more logging to know what is happening).

> **Note:** This pattern is usually implemented with the use of message queues such as AWS SQS or RabbitMQ.

#### Pub-Sub / Event Driven

In this pattern, a service notifies other services about an event that has occurred. The firing service doesn't need to know who is subscribed to receive these events and neither awaits a response from any of them.

**Example:** An Orders Service emits an order cancellation event and subscribed services will handle it differently. A Payments Service might perform a refund, an Inventory Service might return items quantity back to stock and so on.

- **Pros:** Performance, since it does not await any responses; can notify multiple services at once.
- **Cons:** Needs more setup (usually third party applications are involved, such as event managers); Harder error handling (needs more logging to know what is happening).

> **Note:** This pattern is usually implemented with the use of event manager applications such as AWS Event Bridge or AWS SNS.

### 5.3. Selecting the technology stack

Unlike monoliths, microservices decentralized governance allows you to have different technologies and standards for each of them. This gives you the opportunity of choosing the right technology for your service based on the predicted tasks it will perform, so it's worth putting a deep thought while on this step. Have all the service tasks mapped and analyze the best tools available for it to operate as optimal as it can. Think twice before going with little known or hard to use technologies, once microservices most likely are going to be receiving frequent updates and this can become a challenge for future developers to understand and keep maintaining the project.

### 5.4. Designing the code architecture

Remember that microservices can also grow in size as time goes on, so it's always important to have a good code architecture from the very start. Think in advance about all functionalities each service will be providing and how to structure your code accordingly. Choose the right design patterns and stick with defined conventions from start to end.

## 6. Some best practices

As with everything else, microservices architecture design also has its best practices which in most cases some of them are really a must.

### 6.1. Logging and monitoring

Microservices are strongly based on communication and the complexity of communication grows proportionally to the amount of services you have running. It turns out that is not always easy and clear to understand how this whole exchange is happening behind the scenes. For this reason, logging and monitoring are together an essential aspect of microservices architecture and should always be present on it. It is the only way you can have a broad view your services and everything that's going on with each of them, therefore being ready to handle any issues.

**Logging** should provide a broad view of the system. It should be able to allow end-to-end tracing and store as much information as possible. A good advice when working with microservices is that all logs be centralized in one single place so that further analysis can be performed easily. Remember to log as much information as you can, it is never too much information for logging. Essential information should always be present in each log such as timestamps, responsible user, severity, service, message, stack trace, event id, etc.

**Monitoring** looks at metrics and detects anomalies and provide a good view of the status of the service in different aspects. It is also used to notify users about important events that might occur. Monitoring can be done in the service infrastructure, providing information about computer, database and network usage, as well as in the service itself, providing information about the service process.

### 6.2. Testing

We all know that testing is always important, regardless of the system's architecture. With microservices, however, it is a crucial part of the process and should never be ignored, since there will always be many moving parts working independently, which makes it very difficult to spot issues in the whole environment. Implement as many tests as possible and of many types as possible. Some commonly used are:

- **Unit Test** - Tests small and atomic bits of the code, such as methods, functions and interfaces.
- **Integration Test** - Tests the flow of an specific paths of the code.
- **End to End Test** - Tests the complete flow of a service functionality, it might even involve calling external services.

### 6.3. Automated deployments

One of the greatest advantages of microservices compared with traditional monoliths is the possibility of deploying every component separately whenever you want, making the overall process much faster and secure. However, if not automated, this can really become a disadvantage instead, once there will be so many different services running simultaneously that would be impossible to be upgrading each of them manually. For this reason, automated deploy is a must for every microservice architecture design, this implies the use of CI/CD flows, docker containers and so on.

### 6.4. Service mesh

Service mesh is relatively new concept in the software community. It is basically is an external service that is responsible for optimizing the services communication on your environment. Some of the problems that a service mesh can resolve include: timeouts, retries, monitoring, authentication, protocol conversion, circuit breaking, security policies, load balancing, A/B testing and a lot more.

A service mesh acts as a proxy to your service so that every call made by or to your service will first be validated in the service mesh set of rules defined by you. A service mesh can be in process, which means it is implemented in the context of the service and runs alongside it, or it can be side car, which is the most popular option and runs out of the service context, meaning that it is platform agnostic and does not require code modification.

Some examples of popular service mesh applications are: Istio, Linkerd, Maesh and DDS Foundation (the only one that runs in process).

## Conclusion

In summary, microservices architecture represents a innovative approach to building and maintaining modern and scalable software systems. By breaking down monolithic applications into smaller, loosely coupled services, organizations can achieve enhanced agility, flexibility, and resilience. However, it's crucial to recognize that adopting microservices isn't without its challenges. Proper design, monitoring, and orchestration are essential for success. It's also important to know that microservices are not for everything as there are many scenarios where the use of it would just make the overall environment complex without significant benefits. Overall, microservices architecture has so far proven itself to be a great alternative to more traditional designs and has successfully been the optimal choice for lots of highly skilled tech companies. In the rapidly evolving tech landscape, understanding and mastering microservices will undoubtedly be a competitive advantage for those who seek to stay at the forefront of the technology market.

## Sources

- [Microservices Architecture - The Complete Guide by Memi Lavi](https://www.udemy.com/course/microservices-architecture-the-complete-guide/)
- [Microservices by Martin Fowler and James Lewis](https://martinfowler.com/articles/microservices.html)
- Other additional resources which some of them are linked in the article itself.
