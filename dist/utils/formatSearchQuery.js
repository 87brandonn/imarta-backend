"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSearchQuery = void 0;
const formatSearchQuery = (val) => val ? val.replace(/[\s\n\t]/g, '_') : undefined;
exports.formatSearchQuery = formatSearchQuery;
