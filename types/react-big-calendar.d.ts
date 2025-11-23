declare module 'react-big-calendar' {
  import { ComponentType } from 'react';

  export interface Event {
    id?: string | number;
    title: string;
    start: Date;
    end: Date;
    resource?: any;
  }

  export interface CalendarProps {
    localizer: any;
    events: Event[];
    startAccessor?: string | ((event: Event) => Date);
    endAccessor?: string | ((event: Event) => Date);
    views?: string[] | { [key: string]: boolean | ComponentType<any> };
    defaultView?: string;
    culture?: string;
    onSelectEvent?: (event: Event) => void;
    onSelectSlot?: (slotInfo: { start: Date; end: Date }) => void;
    selectable?: boolean;
    popup?: boolean;
    eventPropGetter?: (event: Event) => { className?: string; style?: React.CSSProperties };
    components?: {
      event?: ComponentType<{ event: Event }>;
      [key: string]: any;
    };
    className?: string;
  }

  export class Calendar extends React.Component<CalendarProps> {}

  export function dateFnsLocalizer(config: {
    format: (date: Date, formatStr: string, options?: any) => string;
    parse: (dateStr: string, formatStr: string, referenceDate: Date, options?: any) => Date;
    startOfWeek: (date: Date, options?: any) => Date;
    getDay: (date: Date) => number;
    locales: { [key: string]: any };
  }): any;
}

declare module 'react-big-calendar/lib/css/react-big-calendar.css';
