import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, args: string[]): string {
    if (!value) {
      return value;
    }

    const truncateParams = getTruncateParams(args);
    return value.length > truncateParams.limit
      ? value.substring(0, truncateParams.limit) + truncateParams.trail
      : value;
  }
}

function getTruncateParams(args: string[]) {
  return {
    limit: args && args.length > 0 ? parseInt(args[0], 10) : 20,
    trail: args && args.length > 1 ? args[1] : '...',
  };
}
