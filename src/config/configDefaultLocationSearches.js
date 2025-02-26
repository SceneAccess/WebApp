import { types as sdkTypes } from '../util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
//
// NOTE: these are highly recommended, since they
//       1) help customers to find relevant locations, and
//       2) reduce the cost of using map providers geocoding API
const defaultLocations = [
  {
    id: 'default-bangkok',
    predictionPlace: {
      address: 'Bangkok, Thailand',
      bounds: new LatLngBounds(new LatLng(13.957, 100.728), new LatLng(13.528, 100.327)),
    },
  },
  {
    id: 'default-chiangmai',
    predictionPlace: {
      address: 'Chiang Mai, Thailand',
      bounds: new LatLngBounds(new LatLng(19.001, 99.123), new LatLng(18.669, 98.878)),
    },
  },
  {
    id: 'default-phuket',
    predictionPlace: {
      address: 'Phuket, Thailand',
      bounds: new LatLngBounds(new LatLng(8.191, 98.398), new LatLng(7.726, 98.246)),
    },
  },
  {
    id: 'default-pattaya',
    predictionPlace: {
      address: 'Pattaya, Thailand',
      bounds: new LatLngBounds(new LatLng(13.005, 100.956), new LatLng(12.850, 100.869)),
    },
  },
  {
    id: 'default-krabi',
    predictionPlace: {
      address: 'Krabi, Thailand',
      bounds: new LatLngBounds(new LatLng(8.198, 98.925), new LatLng(7.719, 98.779)),
    },
  },
];

export default defaultLocations;
