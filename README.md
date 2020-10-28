# Bhuwan Garbuja

## Intro

This repo contains experiments for event driven microservice design and development.

## Tech Stack:

Really simple tech stack and simple code.

* NodeJS/Express
* React
* Docker
* Kubernetes (k8s)
* Ingress Nginx
* Skaffold

## Concepts:

The project attempts to build the following different microserices as proof of concept:

* React client (FE)
* posts (MS)
* comments (MS)
* event-bus (MS)
* query (MS)
* moderation (MS)

And the following concepts are covered in this repo:

* Micro-services design and philosophy (how they should behave and work)
* EventBus and EventStorage for async operations
* Comparision with monolithic designs
* Dockerization of services
* Managing k8s clusters/objects with `kubectl`
* K8s deployments and dev practices with Skaffold

## Part 2

This next part attempts to build production grade ms by utilizing third party packages when deemed necessary

[GH repo link](https://github.com/bhuone-garbu/ms-ticketing)
