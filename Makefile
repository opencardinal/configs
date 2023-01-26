.PHONY: install test-keys build start test clean-test-keys stop

all: install build start test stop

install:
	yarn install

build:
	anchor build
	yarn idl:generate

start:
	solana-test-validator --url https://api.devnet.solana.com \
		--bpf-program cnf9Q2MmjDVbzX1kjr8tEEtPJyB4e1avEuBMzWygnWo ./target/deploy/cardinal_configs.so \
		--reset --quiet & echo $$!
	sleep 10

test:
	yarn test

stop:
	pkill solana-test-validator