FROM golang:1.21.4 AS builder

WORKDIR /go/src/github.com/gusflopes/fc-docker

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o fc-docker .

FROM scratch

COPY --from=builder /go/src/github.com/gusflopes/fc-docker/fc-docker /usr/local/bin/fc-docker

ENTRYPOINT ["/usr/local/bin/fc-docker"]
