.PHONY: install test-keys build start test clean-test-keys stop

all: install build start test stop

install:
	yarn install

build:
	anchor build
	yarn idl:generate

start:
	solana-test-validator --url https://api.devnet.solana.com \
		--bpf-program cosTRGbPdRwuyAnWXQ8H7rNXZNXvsQ3nbvzGd9BdvoT ./target/deploy/cardinal_onchain_storage.so \
		--reset --quiet & echo $$!
	sleep 10

test:
	yarn test

stop:
	pkill solana-test-validator