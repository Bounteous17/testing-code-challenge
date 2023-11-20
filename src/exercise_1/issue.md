- Originally this file was not waiting for the promise to resolve. This will in most cases cause the expected properties to be unavailable for use, causing an execution error.

- There was no error s being handled in case the requests fails