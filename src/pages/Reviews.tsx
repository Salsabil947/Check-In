import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Search, Star, TrendingUp } from 'lucide-react';

const reviewsData = [
  { 
    id: 'REV-001', 
    guestName: 'John Smith',
    room: '201',
    rating: 5,
    comment: 'Excellent service and very clean rooms. The staff was incredibly helpful and friendly.',
    category: 'Room',
    date: '2025-10-12',
    status: 'Published'
  },
  { 
    id: 'REV-002', 
    guestName: 'Sarah Johnson',
    room: '305',
    rating: 4,
    comment: 'Great location and comfortable beds. The breakfast could be improved.',
    category: 'Service',
    date: '2025-10-11',
    status: 'Published'
  },
  { 
    id: 'REV-003', 
    guestName: 'Michael Brown',
    room: '102',
    rating: 3,
    comment: 'Average experience. Room was okay but the AC was not working properly.',
    category: 'Room',
    date: '2025-10-10',
    status: 'Under Review'
  },
  { 
    id: 'REV-004', 
    guestName: 'Emily Davis',
    room: '408',
    rating: 5,
    comment: 'Amazing stay! Beautiful room with a great view. Will definitely come back.',
    category: 'Overall',
    date: '2025-10-09',
    status: 'Published'
  },
  { 
    id: 'REV-005', 
    guestName: 'David Wilson',
    room: '203',
    rating: 4,
    comment: 'Good value for money. Staff was friendly and the facilities were well-maintained.',
    category: 'Facilities',
    date: '2025-10-08',
    status: 'Published'
  },
  { 
    id: 'REV-006', 
    guestName: 'Lisa Anderson',
    room: '310',
    rating: 2,
    comment: 'Disappointed with the cleanliness. Found the room not properly cleaned upon arrival.',
    category: 'Cleanliness',
    date: '2025-10-07',
    status: 'Under Review'
  },
];

export function Reviews() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('All');

  const filteredReviews = reviewsData.filter(review => {
    const matchesSearch = 
      review.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.room.includes(searchTerm);
    const matchesRating = filterRating === 'All' || review.rating.toString() === filterRating;
    return matchesSearch && matchesRating;
  });

  const averageRating = (reviewsData.reduce((sum, review) => sum + review.rating, 0) / reviewsData.length).toFixed(1);
  const fiveStarCount = reviewsData.filter(r => r.rating === 5).length;
  const lowRatingCount = reviewsData.filter(r => r.rating <= 2).length;

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-slate-900">Guest Reviews</h1>
        <p className="text-slate-500">Monitor and manage guest feedback</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">Average Rating</h3>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <p className="text-slate-900">{averageRating}</p>
              <div className="flex">
                {renderStars(Math.round(parseFloat(averageRating)))}
              </div>
            </div>
            <p className="text-slate-500 mt-1">From {reviewsData.length} reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">5-Star Reviews</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900 flex items-center gap-2">
              {fiveStarCount}
              <TrendingUp className="w-4 h-4 text-green-500" />
            </p>
            <p className="text-slate-500">
              {((fiveStarCount / reviewsData.length) * 100).toFixed(0)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">Total Reviews</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">284</p>
            <p className="text-slate-500">All time reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-slate-900">Needs Attention</h3>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900">{lowRatingCount}</p>
            <p className="text-slate-500">Low ratings</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rating Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviewsData.filter(r => r.rating === rating).length;
              const percentage = (count / reviewsData.length) * 100;
              return (
                <div key={rating} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-slate-900">{rating}</span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1 h-4 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-slate-600 w-12">{count}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search reviews..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div key={review.id} className="border border-slate-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <p className="text-slate-900">{review.guestName}</p>
                      <Badge variant="outline">Room {review.room}</Badge>
                      <Badge className="bg-[#d1eced] text-[#50b8bd]">{review.category}</Badge>
                    </div>
                    <p className="text-slate-500">{review.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {renderStars(review.rating)}
                    <span className={`${getRatingColor(review.rating)}`}>
                      {review.rating}.0
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 mb-3">{review.comment}</p>
                <div className="flex items-center gap-2">
                  <Badge className={review.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                    {review.status}
                  </Badge>
                  <span className="text-slate-500">Review ID: {review.id}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
