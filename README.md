# My website

[![Main workflow](https://github.com/anttikivi/website/actions/workflows/main.yml/badge.svg)](https://github.com/anttikivi/website/actions/workflows/main.yml)

This is my personal website available at
[anttikivi.fi](https://www.anttikivi.fi).

## Requirements

This repository requires [Node.js](https://nodejs.org) 18 or newer. It uses
[`npm`](https://www.npmjs.com) as a package manager. `npm` comes bundled with
Node.js.

You also need [Hugo](https://gohugo.io). The minimum version required is
0.123.0.

You also need to be able to use `make` to run the repository’s scripts. The
scripts are in the [`Makefile`](/Makefile).

## Getting started

To get started with the website, you need to clone the repository. You can do so
by either using HTTPS, SSH, or the GitHub CLI.

```sh
git clone git@github.com:anttikivi/website.git # SSH
git clone https://github.com/anttikivi/website.git # HTTPS
gh repo clone anttikivi/website # GitHub CLI
```

After cloning the repository, you need to install the dependencies. First change
to the cloned repository.

```sh
cd website
```

Then install the dependencies with `npm`.

```sh
npm install
```

### Running the website locally

To run the website locally, you should use the scripts in the
[`Makefile`](/Makefile).

```sh
make dev
```

### Building

To build the website, you should, as expected, use the scripts in the
[`Makefile`](/Makefile).

```sh
make build
```

### Linting and formatting

The [`Makefile`](/Makefile) includes scripts for linting and formatting the
code. To lint the codebase, use `make lint`. Formatting is done with `make fmt`.

## Licence

The source code in this project is licensed under the Apache-2.0 licence. See
the [`LICENSE`](LICENSE) file for more information.

The Instagram and Threads logos included within the project belong to Meta
Platforms, Inc. or its subsidiaries and are not licensed under the Apache-2.0
license. Instagram and Threads are registered trademarks of Meta Platforms, Inc.
or its subsidiaries.
