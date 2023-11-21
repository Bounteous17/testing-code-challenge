- Originally this file was not waiting for the promise to resolve. This will in most cases cause the expected properties to be unavailable for use, causing an execution error.

- There was no errors being handled in case the requests fails

- The response data types are not being checked before using them. That's not safe.